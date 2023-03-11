import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

const calculateHaversineDistanceBetweenLocations = (location1, location2) => {
	const toRad = (x) => (x * Math.PI) / 180;

	const lat1 = location1.latitude;
	const lon1 = location1.longitude;
	const lat2 = location2.latitude;
	const lon2 = location2.longitude;

	const x1 = lat2 - lat1;
	const dLat = toRad(x1);
	const x2 = lon2 - lon1;
	const dLon = toRad(x2);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const R = 6371; // earth radius in km
	const d = R * c;

	return d;
};

async function main() {
	const areaMap = new Map();
	const weatherData = await fetch(
		"https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
	).then((res) => res.json());
	for (const area of weatherData.area_metadata) {
		areaMap[area.name] = area.label_location;
	}

	const allTrafficCameraImageData = await fetch(
		"https://api.data.gov.sg/v1/transport/traffic-images"
	).then((res) => res.json());

	const cleanedTrafficCameraImageData = [];
	for (const camera of allTrafficCameraImageData.items[0].cameras ?? []) {
		const streetName = await fetch(
			`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${camera.location.latitude},${camera.location.longitude}&token=${process.env.VITE_API_TOKEN}`
		)
			.then((res) => res.json())
			.then((res) => {
				const { ROAD, BUILDINGNAME } = res.GeocodeInfo?.[0] ?? {
					ROAD: "NIL",
					BUILDINGNAME: "NIL",
				};
				if (ROAD === "NIL" && BUILDINGNAME === "NIL") {
					return "Unknown Location";
				} else if (ROAD === "NIL") {
					return BUILDINGNAME;
				} else {
					return ROAD;
				}
			});

		let closestArea = undefined;
		let closestProximity = Infinity;
		for (const entry of Object.entries(areaMap)) {
			const [area, location] = entry;

			const proximity = calculateHaversineDistanceBetweenLocations(
				location,
				camera.location
			);
			if (proximity < closestProximity) {
				closestProximity = proximity;
				closestArea = area;
			}
		}

		cleanedTrafficCameraImageData.push({
			latitude: camera.location.latitude,
			longitude: camera.location.longitude,
			streetName,
			area: closestArea,
		});
	}

	await prisma.location.createMany({ data: cleanedTrafficCameraImageData });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
