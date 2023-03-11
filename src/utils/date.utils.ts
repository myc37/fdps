export const getCurrentDateString = () => {
	const now = new Date();
	now.setHours(now.getHours() + 8);
	return convertDateToString(now);
};

export const convertDateToString = (datetime: Date) =>
	datetime.toISOString().substring(0, 16);

export const formatDateStringForApiEndpoint = (datetimeString: string) =>
	datetimeString.replaceAll(":", "%3A");
