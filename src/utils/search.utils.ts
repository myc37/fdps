import { EXPRESS_WAY_MAP } from "../constants";
import { CleanedImageDataWithWeather } from "../types/trafficImages.types";

export const filterDataBySearchString = (
	data: Array<CleanedImageDataWithWeather> | undefined,
	search: string
) => {
	if (!data || data.length === 0) return [];

	return data.filter(
		(doc) =>
			search === "" ||
			doc.streetName.toLowerCase().includes(search.toLowerCase()) ||
			search.toLowerCase().includes(doc.streetName.toLowerCase()) ||
			doc.streetName.toLowerCase() ===
				EXPRESS_WAY_MAP[search.toUpperCase()]
	);
};
