import {
	CachedLocationData,
	CleanedCachedImageData,
	CleanedImageData,
	TrafficImagesDataFromApi,
} from "../../types/trafficImages.types";
import { formatDateStringForApiEndpoint } from "../../utils/date.utils";
import { getStreetName } from "./reverseGeocoding.helpers";

export const getTrafficImagesApi = (datetimeString: string) =>
	`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${formatDateStringForApiEndpoint(
		datetimeString
	)}`;

export const getTrafficImagesData = async (
	datetimeString: string
): Promise<TrafficImagesDataFromApi> =>
	await fetch(getTrafficImagesApi(datetimeString)).then((res) => res.json());

export const cleanImagesData = async (
	trafficImagesData: TrafficImagesDataFromApi
): Promise<Array<CleanedImageData>> => {
	const cleanedImagesData: Array<CleanedImageData> = [];
	for (const camera of trafficImagesData.items[0].cameras ?? []) {
		const streetName = await getStreetName(camera.location);

		cleanedImagesData.push({
			image: camera.image,
			streetName,
			location: camera.location,
		});
	}

	return cleanedImagesData;
};

export const addImageToCachedLocationData = (
	cachedLocationData: CachedLocationData,
	trafficImagesData: TrafficImagesDataFromApi
): Array<CleanedCachedImageData> => {
	const imageMap: Record<string, string> = {};
	for (const data of trafficImagesData.items[0].cameras ?? []) {
		imageMap[`${data.location.latitude}${data.location.longitude}`] =
			data.image;
	}

	return cachedLocationData.map((data) => {
		return {
			image: imageMap[`${data.latitude}${data.longitude}`],
			streetName: data.streetName,
			location: {
				latitude: data.latitude,
				longitude: data.longitude,
			},
			area: data.area,
		};
	});
};
