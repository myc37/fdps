import { useQuery } from "react-query";
import {
	getTrafficImagesData,
	cleanImagesData,
} from "./helpers/trafficImages.helpers";
import {
	getAreasAndForecast,
	addWeatherToCleanedImagesData,
} from "./helpers/weather.helpers";

export const getTrafficImages = (dateString: string, enabled: boolean) => {
	const key = "getTrafficImages";

	const fetchData = async (dateString: string) => {
		const { areas, forecast } = await getAreasAndForecast(dateString);
		const trafficImagesData = await getTrafficImagesData(dateString);
		const cleanedImagesData = await cleanImagesData(trafficImagesData);
		const cleanedImagesDataWithWeather = addWeatherToCleanedImagesData(
			cleanedImagesData,
			areas,
			forecast
		);

		return cleanedImagesDataWithWeather;
	};

	return useQuery(key, () => fetchData(dateString), {
		enabled,
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
