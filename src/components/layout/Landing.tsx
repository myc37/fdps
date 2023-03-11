import { type FC } from "react";
import DatePicker, { DatePickerProps } from "../DatePicker";

type Props = {
	datePickerProps: DatePickerProps;
};

const Landing: FC<Props> = ({ datePickerProps }) => {
	return (
		<div className="flex-grow w-full flex justify-center">
			<div className="flex flex-col gap-y-2 w-1/3 justify-center">
				<div className="text-3xl mb-8 font-semibold">
					Making traffic camera images more accesible to all in
					Singapore
				</div>
				<div className="italic">
					Select a date and time to get started
				</div>
				<DatePicker {...datePickerProps} />
			</div>
			<div className="w-1/2"></div>
		</div>
	);
};

export default Landing;
