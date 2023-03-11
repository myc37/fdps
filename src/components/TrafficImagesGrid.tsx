import { type FC } from "react";
import { type CleanedImageDataWithWeather } from "../types/trafficImages.types";
import { Fade } from "react-awesome-reveal";

type Props = {
	display: Array<CleanedImageDataWithWeather>;
};

export const TrafficImagesGrid: FC<Props> = ({ display }) => {
	return (
		<Fade cascade triggerOnce>
			<div className="p-8 grid grid-cols-4 gap-4">
				{display.map((doc) => (
					<div
						key={doc.image.id}
						className="bg-neutral-50 rounded-md border-2 p-2 flex flex-col drop-shadow-md transition-colors hover:border-green-600"
					>
						<div className="text-sm mb-1 mx-2 capitalize flex justify-between">
							<div className="font-semibold">
								{doc.streetName.toLowerCase()}
							</div>
							<div>{doc.weather}</div>
						</div>
						<img
							src={doc.image.src}
							alt={doc.streetName}
							style={{ aspectRatio: "16 / 9" }}
							className="rounded-md m-2"
						/>
					</div>
				))}
			</div>
		</Fade>
	);
};
