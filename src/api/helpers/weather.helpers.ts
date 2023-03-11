import {
	CleanedCachedImageData,
	CleanedImageData,
	CleanedImageDataWithWeather,
} from "../../types/trafficImages.types";
import { WeatherDataFromApi } from "../../types/weather.types";
import { formatDateStringForApiEndpoint } from "../../utils/date.utils";
import { Location } from "../../types";
import { calculateHaversineDistanceBetweenLocations } from "../../utils/math.utils";

const getWeatherApi = (datetimeString: string) =>
	`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${formatDateStringForApiEndpoint(
		datetimeString
	)}`;

export const getAreasAndForecast = async (
	datetimeString: string
): Promise<{
	areas: Set<Location>;
	forecast: Record<string, string>;
}> =>
	await fetch(getWeatherApi(datetimeString))
		.then((res) => res.json())
		.then((res: WeatherDataFromApi) => {
			const areas: Set<Location> = new Set();
			const areaMap: Record<string, string> = {};
			const forecast: Record<string, string> = {};
			res.area_metadata.forEach((area) => {
				areaMap[
					area.name
				] = `${area.label_location.latitude}${area.label_location.longitude}`;
				areas.add(area.label_location);
			});
			res.items[0].forecasts.forEach(
				(data) => (forecast[areaMap[data.area]] = data.forecast)
			);

			return { areas, forecast };
		});

export const getForecast = async (datetimeString: string) =>
	await fetch(getWeatherApi(datetimeString))
		.then((res) => res.json())
		.then((res: WeatherDataFromApi) => {
			const forecast: Record<string, string> = {};
			res.items[0].forecasts.forEach(
				(data) => (forecast[data.area] = data.forecast)
			);

			return forecast;
		});

export const addWeatherToCleanedImagesData = (
	cleanedImagesData: Array<CleanedImageData>,
	areas: Set<Location>,
	forecast: Record<string, string>
) => {
	const cleanedImagesDataWithWeather: Array<CleanedImageDataWithWeather> = [];
	for (const data of cleanedImagesData) {
		let targetArea: Location | undefined = undefined;
		if (areas.has(data.location)) {
			targetArea = data.location;
		} else {
			let proximityToClosestArea: number = Infinity;
			for (const area of areas) {
				const proximity = calculateHaversineDistanceBetweenLocations(
					data.location,
					area
				);
				if (proximity < proximityToClosestArea) {
					targetArea = area;
					proximityToClosestArea = proximity;
				}
			}
		}

		if (targetArea == undefined) throw new Error();
		cleanedImagesDataWithWeather.push({
			...data,
			weather: forecast[`${targetArea.latitude}${targetArea.longitude}`],
		});
	}

	return cleanedImagesDataWithWeather;
};

export const addWeatherToCleanedCachedImagesData = (
	cleanedImagesData: Array<CleanedCachedImageData>,
	forecast: Record<string, string>
): Array<CleanedImageDataWithWeather> => {
	return cleanedImagesData.map((data) => {
		return { ...data, weather: forecast[data.area] };
	});
};
