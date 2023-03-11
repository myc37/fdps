import { Location } from "../types";

export const calculateHaversineDistanceBetweenLocations = (
	location1: Location,
	location2: Location
) => {
	const toRad = (x: number) => (x * Math.PI) / 180;

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
