import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { getTrafficImages } from "./api";
import { type DatePickerProps } from "./components/DatePicker";
import Container from "./components/layout/Container";
import Navbar from "./components/nav/Navbar";
import { TrafficImagesGrid } from "./components/TrafficImagesGrid";

const App = () => {
	const [dateString, setDateString] = useState("");
	const [prevDateString, setPrevDateString] = useState("");
	const [isEnabled, setIsEnabled] = useState(false);
	const { data, refetch, isLoading, isFetching } = getTrafficImages(
		dateString + ":00",
		isEnabled
	);

	const isNewDateString = dateString !== prevDateString;

	const handleSelectDate: ChangeEventHandler<HTMLInputElement> = (e) =>
		setDateString(e.target.value);

	const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		setPrevDateString(dateString);
		if (!isEnabled) setIsEnabled(true);
		else refetch();
	};

	const datePickerProps: DatePickerProps = {
		dateString,
		handleSelectDate,
		handleSubmit,
		isNewDateString,
	};

	return (
		<Container>
			<Navbar datePickerProps={datePickerProps} />
			{isLoading || isFetching ? (
				<div>loading...</div>
			) : (
				<TrafficImagesGrid display={data ?? []} />
			)}
		</Container>
	);
};

export default App;
