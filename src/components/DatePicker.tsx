import { ChangeEventHandler, MouseEventHandler, type FC } from "react";
import { getCurrentDatetimeString } from "../utils/date";
import Input from "./control/Input";

export type DatePickerProps = {
	dateString: string;
	isNewDateString: boolean;
	handleSelectDate: ChangeEventHandler<HTMLInputElement>;
	handleSubmit: MouseEventHandler<HTMLButtonElement>;
};

const DatePicker: FC<DatePickerProps> = ({
	dateString,
	isNewDateString,
	handleSelectDate,
	handleSubmit,
}) => {
	const isEmpty = dateString === "";
	const isValidDatetimeString =
		new Date().getTime() >= new Date(dateString).getTime();
	const disabled = isEmpty || !isNewDateString || !isValidDatetimeString;

	return (
		<form className="flex gap-x-2 items-center">
			<label htmlFor="datetime-picker" className="">
				Find latest traffic camera images as of:
			</label>
			<Input
				id="datetime-picker"
				type="datetime-local"
				value={dateString}
				max={getCurrentDatetimeString()}
				onChange={handleSelectDate}
				className="mx-2"
			/>
			<button
				type="submit"
				onClick={handleSubmit}
				className={`border p-4 text-white rounded-md group relative ${
					disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
				}`}
				disabled={disabled}
			>
				Find
				<span
					className={`invisible bg-red-300 w-80 max-w-96 rounded-md absolute top-1/2 right-1/8 p-2 z-20 ${
						disabled ? "group-hover:visible" : ""
					}`}
				>
					&#9888;&#65039;{" "}
					{isEmpty
						? "Date and time input cannot be empty"
						: !isNewDateString
						? "Already displaying traffic camera images for this date and time"
						: !isValidDatetimeString
						? "Date and time selected must be in the past"
						: ""}
				</span>
			</button>
		</form>
	);
};

export default DatePicker;
