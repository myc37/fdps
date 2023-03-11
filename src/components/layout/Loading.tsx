const Loading = () => {
	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<div className="lds-spinner">
				{Array.from(Array(12).keys()).map((idx) => (
					<div key={idx} />
				))}
			</div>
		</div>
	);
};

export default Loading;
