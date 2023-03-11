import type { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
	className?: string;
};

const Container: FC<Props> = ({ children, className }) => {
	const defaultClassname = "min-h-screen bg-yellow-50";
	return <div className={`${defaultClassname} ${className}`}>{children}</div>;
};

export default Container;
