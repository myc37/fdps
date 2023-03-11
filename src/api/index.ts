import { useQuery } from "react-query";
import { CachedLocationData } from "../types/trafficImages.types";
import {
	getTrafficImagesData,
	cleanImagesData,
	addImageToCachedLocationData,
} from "./helpers/trafficImages.helpers";
import {
	getAreasAndForecast,
	addWeatherToCleanedImagesData,
	getForecast,
	addWeatherToCleanedCachedImagesData,
} from "./helpers/weather.helpers";

export const getTrafficImages = (dateString: string, enabled: boolean) => {
	const key = "getTrafficImages";

	const fetchData = async (dateString: string) => {
		const cachedLocationData: CachedLocationData = await fetch(
			"http://localhost:3000/api/getAllLocations"
		).then((res) => res.json());
		const trafficImagesData = await getTrafficImagesData(dateString);

		if (cachedLocationData.length > 0) {
			const forecast = await getForecast(dateString);
			const cleanedCachedImagesData = await addImageToCachedLocationData(
				cachedLocationData,
				trafficImagesData
			);
			const cleanedCachedImagesDataWithWeather =
				addWeatherToCleanedCachedImagesData(
					cleanedCachedImagesData,
					forecast
				);

			return cleanedCachedImagesDataWithWeather;
		} else {
			const { areas, forecast } = await getAreasAndForecast(dateString);
			const cleanedImagesData = await cleanImagesData(trafficImagesData);
			const cleanedImagesDataWithWeather = addWeatherToCleanedImagesData(
				cleanedImagesData,
				areas,
				forecast
			);

			return cleanedImagesDataWithWeather;
		}
	};

	return useQuery(key, () => fetchData(dateString), {
		enabled,
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
