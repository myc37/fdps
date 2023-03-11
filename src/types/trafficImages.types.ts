import { ApiInfoStatus, Location } from ".";

type ImageMetaData = {
	height: number;
	width: number;
	md5: string;
};

export type TrafficImagesDataFromApi = {
	items: Array<{
		timestamp: string;
		cameras: Array<{
			timestamp: string;
			image: string;
			location: Location;
			camera_id: number;
			image_metadata: ImageMetaData;
		}>;
	}>;
	api_info: {
		status: ApiInfoStatus;
	};
};

export type CleanedImageData = {
	image: {
		id: ImageMetaData["md5"];
		src: string;
	};
	streetName: string;
	location: Location;
};

export type CleanedImageDataWithWeather = CleanedImageData & {
	weather: string;
};
