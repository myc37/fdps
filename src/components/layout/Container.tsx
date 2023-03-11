import type { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const Container: FC<Props> = ({ children }) => {
	return (
		<div className="min-h-screen w-full flex flex-col bg-yellow-50 overflow-visible">
			{children}
		</div>
	);
};

export default Container;
