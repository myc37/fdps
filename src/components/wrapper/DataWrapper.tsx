import type { ReactNode, FC } from "react";
import Loading from "../layout/Loading";

type Props = {
	isLoading: boolean;
	children: ReactNode;
};

const DataWrapper: FC<Props> = ({ isLoading, children }) => {
	return isLoading ? <Loading /> : <>{children}</>;
};

export default DataWrapper;
