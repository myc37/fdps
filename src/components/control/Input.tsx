import {
	ChangeEventHandler,
	CSSProperties,
	FC,
	HTMLInputTypeAttribute,
} from "react";

type Props = {
	className?: string;
	id?: string;
	value?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	style?: CSSProperties;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	max?: string | number;
};

const Input: FC<Props> = ({
	className,
	id,
	value,
	onChange,
	style,
	type,
	placeholder,
	max,
}) => {
	const defaultClassname =
		"border rounded-md text-sm p-4 bg-white hover:border-green-600 focus-visible:outline-green-600 transition-colors";

	return (
		<input
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			className={`${defaultClassname} ${className}`}
			style={style}
			placeholder={placeholder}
			max={max}
		/>
	);
};

export default Input;
