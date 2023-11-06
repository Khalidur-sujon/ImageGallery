import { useState } from "react";
import {
	DndContext,
	DragOverlay,
	DragStartEvent,
	useSensor,
	useSensors,
	PointerSensor,
	DragOverEvent,
	closestCenter,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

//Images & Image type
import images, { ImageType } from "../images";

// components
import SortableImage from "./SortableImage";
import AddImageButton from "./AddImageButton";

const ImageGallery = () => {
	const [imageList, setImageList] = useState(images);
	const [selectedImage, setselectedImage] = useState<ImageType[]>([]);
	const [activeImage, setactiveImage] = useState<ImageType | undefined>(
		undefined
	);
	const [isDragged, setisDragged] = useState<boolean>(false);

	const selectedImageLength = selectedImage.length;
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3,
			},
		})
	);

	//FUNCTION
	const handleSelectedImage = (image: ImageType, isChecked: boolean) => {
		if (isChecked) {
			//Checkbox is checked, so add images to selected images
			setselectedImage((prevSelectedImages) => [
				...prevSelectedImages,
				image,
			]);
		} else {
			//Checkbox is Unchecked, so remove images from selected images
			setselectedImage((prevSelectedImages) =>
				prevSelectedImages.filter(
					(prevSelectedImage) => prevSelectedImage.id !== image.id
				)
			);
		}
		return selectedImage;
	};

	const handleDeleteImages = () => {
		//Update the image list
		setImageList((initialImages) =>
			initialImages.filter((item) => !selectedImage.includes(item))
		);

		//Update the selected image list
		setselectedImage([]);
	};

	const handleDragStart = (event: DragStartEvent) => {
		//Track an element , when is it dragging
		setisDragged(true);

		//If any dragging happens, then all selected item will be deleted
		setselectedImage([]);

		//Set image as active based on active status
		if (event.active.data.current?.type) {
			setactiveImage(event.active.data.current.image);
		}
	};

	const handleDragOver = (event: DragOverEvent) => {
		if (event.over && event.active) {
			const oldIndex: number = imageList.indexOf(
				event.active.data.current?.image
			);

			const newIndex: number = imageList.indexOf(
				event.over.data.current?.image
			);

			if (oldIndex !== -1 && newIndex !== -1) {
				// Create a new array with the task order updated
				const updatedImageList = [...imageList];
				updatedImageList.splice(oldIndex, 1); // Remove the task from the old index
				updatedImageList.splice(
					newIndex,
					0,
					event.active.data.current?.image
				); // Insert the task at the new index
				setImageList(updatedImageList); // Update the state with the new task order
			}
		}
	};

	const handleDragEnd = () => {
		//Draging status false, when element's dragging operation is over
		setisDragged(false);
		//Set active image undefined
		setactiveImage(undefined);
	};

	return (
		<div className="w-full min-h-screen  bg-gray-100 flex  justify-center p-4">
			<div className="mx-auto bg-white w-full  rounded-md">
				{/* Header */}
				<div className="w-full mx-auto flex  px-6  h-[50px] border-b">
					{selectedImageLength > 0 ? (
						<div className="flex justify-between items-center w-full">
							<div className="flex items-center gap-2">
								<input
									type="checkbox"
									checked
									readOnly
									className="w-4 h-4"
								/>
								<p className="text-xl font-bold">
									<span>{selectedImageLength}</span>{" "}
									{selectedImageLength > 1
										? "Files "
										: "File "}{" "}
									Selected
								</p>
							</div>

							<button
								className="text-[15px]  hover:border-b-2  border-red-600 text-red-600 font-semibold cursor-pointer"
								onClick={handleDeleteImages}
							>
								Delete{" "}
								{selectedImageLength > 1 ? "Files" : "File"}
							</button>
						</div>
					) : (
						<h1 className="text-2xl font-bold py-2">Gallery</h1>
					)}
				</div>
				{/* Image section */}
				{/* Drag & Drop context */}
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					onDragOver={handleDragOver}

					// setIsSelect={setIsSelect}
				>
					<SortableContext
						items={imageList}
						strategy={rectSortingStrategy}
					>
						<div className="grid grid-cols-1 sm:grid-cols-3  lg:grid-cols-5 gap-2 sm:gap-6 p-6 sm:p-10 m-auto ">
							{/*  Sortable Context */}

							{imageList.map(
								(image: ImageType, index: number) => (
									<SortableImage
										key={index}
										image={image}
										index={index}
										handleSelectedImage={
											handleSelectedImage
										}
										isDragged={isDragged}
									/>
								)
							)}

							<AddImageButton />
						</div>
					</SortableContext>

					{/* Drag Overlay */}
					{createPortal(
						<DragOverlay adjustScale={true}>
							{activeImage ? (
								<SortableImage
									image={activeImage}
									handleSelectedImage={handleSelectedImage}
									isDragged={isDragged}
								/>
							) : null}
						</DragOverlay>,
						document.body
					)}
				</DndContext>
			</div>
		</div>
	);
};

export default ImageGallery;
