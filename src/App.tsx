import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { getTrafficImages } from "./api";
import { type DatePickerProps } from "./components/DatePicker";
import Container from "./components/layout/Container";
import Landing from "./components/layout/Landing";
import Loading from "./components/layout/Loading";
import Navbar from "./components/nav/Navbar";
import { SearchProps } from "./components/Search";
import { TrafficImagesGrid } from "./components/TrafficImagesGrid";
import DataWrapper from "./components/wrapper/DataWrapper";
import { getCurrentDateString } from "./utils/date.utils";
import { filterDataBySearchString } from "./utils/search.utils";

const App = () => {
	const [dateString, setDateString] = useState(getCurrentDateString());
	const [prevDateString, setPrevDateString] = useState("");
	const [isEnabled, setIsEnabled] = useState(false);
	const [search, setSearch] = useState("");
	const { data, refetch, isLoading, isFetching } = getTrafficImages(
		dateString + ":00",
		isEnabled
	);

	const isNoDateInputYet = prevDateString === "";
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
			{isNoDateInputYet ? (
				<Landing datePickerProps={datePickerProps} />
			) : (
				<>
					<Navbar
						datePickerProps={datePickerProps}
						searchProps={searchProps}
					/>
					<DataWrapper isLoading={isLoading || isFetching}>
						<TrafficImagesGrid display={display} />
					</DataWrapper>
				</>
			)}
		</Container>
	);
};

export default App;
