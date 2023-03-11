import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { getTrafficImages } from "./api";
import { type DatePickerProps } from "./components/DatePicker";
import Container from "./components/layout/Container";
import Loading from "./components/layout/Loading";
import Navbar from "./components/nav/Navbar";
import { SearchProps } from "./components/Search";
import { TrafficImagesGrid } from "./components/TrafficImagesGrid";
import { filterDataBySearchString } from "./utils/search.utils";

const App = () => {
	const [dateString, setDateString] = useState("");
	const [prevDateString, setPrevDateString] = useState("");
	const [isEnabled, setIsEnabled] = useState(false);
	const [search, setSearch] = useState("");
	const { data, refetch, isLoading, isFetching } = getTrafficImages(
		dateString + ":00",
		isEnabled
	);

	const isNewDateString = dateString !== prevDateString;

	const handleSelectDate: ChangeEventHandler<HTMLInputElement> = (e) =>
		setDateString(e.target.value);

	const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) =>
		setSearch(e.target.value);

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

	const searchProps: SearchProps = {
		search,
		handleSearch,
	};

	const display = filterDataBySearchString(data, search);

	return (
		<Container>
			<Navbar
				datePickerProps={datePickerProps}
				searchProps={searchProps}
			/>
			{isLoading || isFetching ? (
				<Loading />
			) : (
				<TrafficImagesGrid display={display} />
			)}
		</Container>
	);
};

export default App;
