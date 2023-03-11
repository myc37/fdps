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
	const [open, setOpen] = useState(false);

	const handleScrollPastTop = () => {
		setIsAtTop(window.scrollY === 0);
	};

	const handleOpen = () => setOpen((prev) => !prev);

	useEffect(() => {
		window.addEventListener("scroll", handleScrollPastTop, {
			passive: true,
		});

		return () => window.removeEventListener("scroll", handleScrollPastTop);
	}, []);

	return (
		<div
			className={`sticky top-0 left-0 right-0 z-20 w-full transition-all p-4 ${
				isAtTop ? "bg-yellow-50" : "bg-yellow-100"
			} ${open ? "h-36" : "h-16"} md:h-24`}
		>
			<img
				src="menu.png"
				alt="menu"
				className={`w-6 h-6 absolute top-4 right-4 z-40 md:hidden`}
				onClick={handleOpen}
			/>
			<div
				className={`flex md:hidden flex-col gap-y-2 transition-opacity ${
					open ? "opacity-1" : "opacity-0"
				}`}
			>
				<DatePicker {...datePickerProps} showLabel />
				<Search {...searchProps} />
			</div>
			<div className="hidden md:flex justify-between w-full">
				<Fade direction="down" triggerOnce>
					<DatePicker {...datePickerProps} showLabel />
					<Search {...searchProps} />
				</Fade>
			</div>
		</div>
	);
};

export default Navbar;
