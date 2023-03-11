import { ChangeEventHandler, type FC } from "react";
import Input from "./control/Input";

export type SearchProps = {
	search: string;
	handleSearch: ChangeEventHandler<HTMLInputElement>;
};

const Search: FC<SearchProps> = ({ search, handleSearch }) => {
	return (
		<Input
			placeholder="Search by location eg; PIE, AYE, etc"
			style={{
				backgroundImage: "url('search.png')",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "12px 14px",
				backgroundSize: "24px",
				paddingLeft: "48px",
			}}
			className="w-80"
			value={search}
			onChange={handleSearch}
		/>
	);
};

export default Search;
