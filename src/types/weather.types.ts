import { ApiInfoStatus, Location } from ".";

export type WeatherDataFromApi = {
	area_metadata: Array<{
		name: string;
		label_location: Location;
	}>;
	items: Array<{
		updated_timestamp: string;
		timestamp: string;
		valid_period: {
			start: string;
			end: string;
		};
		forecasts: Array<{
			area: string;
			forecast: string;
		}>;
	}>;
	api_info: {
		status: ApiInfoStatus;
	};
};
