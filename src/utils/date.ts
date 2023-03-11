export const getCurrentDatetimeString = () => {
	const now = new Date();
	now.setHours(now.getHours() + 8);
	return convertDatetimeToString(now);
};

export const convertDatetimeToString = (datetime: Date) =>
	datetime.toISOString().substring(0, 16);
