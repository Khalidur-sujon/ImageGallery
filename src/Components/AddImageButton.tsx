//icons
import { BiImageAlt } from "react-icons/bi";

const AddImageButton = () => {
	return (
		<div className="border-2 border-dashed flex flex-col items-center justify-center gap-4 border-gray-300 rounded-md text-slate-600 min-[375px]:w-52  w-fit sm:w-full  h-full  p-10 sm:p-12 lg:p-14 m-auto ">
			<span className="text-3xl">
				<BiImageAlt />
			</span>
			<p className="text-sm font-normal">Add Images</p>
		</div>
	);
};

export default AddImageButton;
