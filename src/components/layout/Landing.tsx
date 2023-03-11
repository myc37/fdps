import { type FC } from "react";
import DatePicker, { DatePickerProps } from "../DatePicker";

type Props = {
	datePickerProps: DatePickerProps;
};

const Landing: FC<Props> = ({ datePickerProps }) => {
	return (
		<div className="flex flex-col md:flex-row justify-center gap-y-8 md:gap-x-16 h-screen md:h-auto">
			<div className="flex flex-col justify-center ml-4 md:w-1/3 md:h-screen">
				<div className="text-xl md:text-3xl mb-8 font-semibold">
					Making traffic camera images more accesible to all in
					Singapore
				</div>
				<div className="italic">
					Select a date and time to get started
				</div>
				<DatePicker {...datePickerProps} />
			</div>
			<img
				src="landing.jpeg"
				alt="landing"
				className="md:mt-0 object-contain p-8"
			/>
		</div>
	);
};

export default Landing;
