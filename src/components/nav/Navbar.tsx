import { FC, useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import DatePicker, { type DatePickerProps } from "../DatePicker";
import Search, { SearchProps } from "../Search";

type Props = {
	datePickerProps: DatePickerProps;
	searchProps: SearchProps;
};

const Navbar: FC<Props> = ({ datePickerProps, searchProps }) => {
	const [isAtTop, setIsAtTop] = useState(true);

	const handleScrollPastTop = () => {
		setIsAtTop(window.scrollY === 0);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScrollPastTop, {
			passive: true,
		});

		return () => window.removeEventListener("scroll", handleScrollPastTop);
	}, []);

	return (
		<div
			className={`sticky top-0 z-20 p-4 justify-between flex transition-colors ${
				isAtTop ? "bg-yellow-50" : "bg-yellow-100"
			}`}
		>
			<Fade direction="down" triggerOnce>
				<DatePicker {...datePickerProps} showLabel />
				<Search {...searchProps} />
			</Fade>
		</div>
	);
};

export default Navbar;
