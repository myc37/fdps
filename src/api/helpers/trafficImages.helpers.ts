import {
	CleanedImageData,
	TrafficImagesDataFromApi,
} from "../../types/trafficImages.types";
import { formatDatetimeStringForApiEndpoint } from "../../utils/date.utils";
import { getStreetName } from "./reverseGeocoding.helpers";

export const getTrafficImagesApi = (datetimeString: string) =>
	`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${formatDatetimeStringForApiEndpoint(
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
			image: {
				src: camera.image,
				id: camera.image_metadata.md5,
			},
			streetName,
			location: camera.location,
		});
	}

	return cleanedImagesData;
};
