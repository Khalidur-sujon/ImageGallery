import { ChangeEvent, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

//types
import { ImageType } from "../images";

//props type
interface Props {
	image: ImageType;
	handleSelectedImage: (image: ImageType, isChecked: boolean) => ImageType[];
	isDragged: boolean;
	index?: number;
}

const SortableImage = (props: Props) => {
	const { image, handleSelectedImage, isDragged, index } = props;
	const [isSelect, setIsSelect] = useState<boolean>(false);

	//configure useSortable hook
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: image.id,
		data: {
			type: "Image",
			image,
		},
	});
	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	//FUNCTION

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		image: ImageType
	) => {
		const isChecked = e.target.checked;
		setIsSelect(isChecked);
		handleSelectedImage(image, isChecked);
	};

	//Custom drag overlay

	if (isDragging) {
		return (
			<div
				className={` ${
					index === 0
						? "col-span-1 sm:col-span-2 row-span-1 sm:row-span-2  "
						: " col-span-1 w-44 min-[375px]:w-52 sm:w-fit "
				} border-2 rounded-md  bg-gray-200 bg-cover bg-center mt-4 transition duration-300 mx-auto  sm:mt-0 `}
				ref={setNodeRef}
				style={style}
			>
				<img
					className={`object-cover h-fit rounded-md origin-top-left opacity-0 ${
						index === 0 ? "opacity-100" : ""
					}
			}`}
					src={image.src}
				/>
			</div>
		);
	}

	return (
		<div
			className={` ${
				index === 0
					? "col-span-1 sm:col-span-2 row-span-1 sm:row-span-2  "
					: " col-span-1 w-44 min-[370px]:w-54  sm:w-fit "
			} border-2 rounded-md  relative bg-cover bg-center mt-4 transition duration-300  sm:mt-0 origin-center  mx-auto cursor-grab`}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			{isDragged ? (
				// No overlay & No Input
				<div className="w-full h-full absolute"></div>
			) : (
				//With overlay &  Input
				<div
					className={`${
						isSelect
							? "bg-white/40 opacity-100"
							: "hover:bg-black/40"
					}    absolute opacity-0 hover:opacity-100  w-full h-full`}
				>
					{/* Input */}

					<input
						type="checkbox"
						className={` absolute w-5 h-5 top-[7%] left-[5%] outline-none rounded-md cursor-pointer `}
						onChange={(e) => handleChange(e, image)}
					/>
				</div>
			)}

			<img
				src={image.src}
				className={`object-cover h-fit rounded-md origin-center bg-white"
				}`}
			/>
		</div>
	);
};

export default SortableImage;
