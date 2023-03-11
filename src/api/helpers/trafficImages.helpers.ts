import { TrafficImagesDataFromApi } from "../../types/trafficImages.types";
import { formatDatetimeStringForApiEndpoint } from "../../utils/date";

export const getTrafficImagesApi = (datetimeString: string) =>
	`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${formatDatetimeStringForApiEndpoint(
		datetimeString
	)}`;

export const getTrafficImagesData = async (
	datetimeString: string
): Promise<TrafficImagesDataFromApi> =>
	await fetch(getTrafficImagesApi(datetimeString)).then((res) => res.json());
