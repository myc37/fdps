import { type FC } from "react";
import DatePicker, { DatePickerProps } from "../DatePicker";

type Props = {
	datePickerProps: DatePickerProps;
};

const Landing: FC<Props> = ({ datePickerProps }) => {
	return (
		<div className="flex flex-col justify-center ml-4 h-screen">
			<div className="text-xl md:text-3xl mb-8 font-semibold">
				Making traffic camera images more accesible to all in Singapore
			</div>
			<div className="italic">Select a date and time to get started</div>
			<DatePicker {...datePickerProps} />
		</div>
	);
};

export default Landing;
