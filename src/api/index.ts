import { useQuery } from "react-query";
import {
	getTrafficImagesData,
	cleanImagesData,
} from "./helpers/trafficImages.helpers";
import {
	getAreasAndForecast,
	addWeatherToCleanedImagesData,
} from "./helpers/weather.helpers";

export const getTrafficImages = (datetimeString: string, enabled: boolean) => {
	const key = "getTrafficImages";

	const fetchData = async (datetimeString: string) => {
		const { areas, forecast } = await getAreasAndForecast(datetimeString);
		const trafficImagesData = await getTrafficImagesData(datetimeString);
		const cleanedImagesData = await cleanImagesData(trafficImagesData);
		const cleanedImagesDataWithWeather = addWeatherToCleanedImagesData(
			cleanedImagesData,
			areas,
			forecast
		);

		return cleanedImagesDataWithWeather;
	};

	return useQuery(key, () => fetchData(datetimeString), {
		enabled,
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
