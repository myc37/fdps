import { NO_VALUE } from "../../constants";
import { type Location } from "../../types";

const getReverseGeocodingApi = (location: Location) =>
	`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${
		location.latitude
	},${location.longitude}&token=${import.meta.env.VITE_API_TOKEN}`;

export const getStreetName = async (location: Location): Promise<string> =>
	await fetch(getReverseGeocodingApi(location))
		.then((res) => res.json())
		.then((res) => {
			const { ROAD, BUILDINGNAME } = res.GeocodeInfo?.[0] ?? {
				ROAD: NO_VALUE,
				BUILDINGNAME: NO_VALUE,
			};
			if (ROAD === NO_VALUE && BUILDINGNAME === NO_VALUE) {
				return "Unknown Location";
			} else if (ROAD === NO_VALUE) {
				return BUILDINGNAME;
			} else {
				return ROAD;
			}
		});
