import image1 from "./assets/image-1.webp";
import image2 from "./assets/image-2.webp";
import image3 from "./assets/image-3.webp";
import image4 from "./assets/image-4.webp";
import image5 from "./assets/image-5.webp";
import image6 from "./assets/image-6.webp";
import image7 from "./assets/image-7.webp";
import image8 from "./assets/image-8.webp";
import image9 from "./assets/image-9.webp";
import image10 from "./assets/image-10.jpeg";
import image11 from "./assets/image-11.jpeg";

export type ImageType = {
	src: string;
	id: string;
};

const images: ImageType[] = [
	{ src: image1, id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8" },
	{ src: image2, id: "6ba7b810-9dad-11d1-80b4-00c04fd430c9" },
	{ src: image3, id: "6ba7b810-9dad-11d1-80b4-00c04fd430ca" },
	{ src: image4, id: "f71c1e1c-5925-47dd-9637-8accc9ed9290" },
	{ src: image5, id: "0d21489b-4f61-48c7-8f52-30f161131158" },
	{ src: image6, id: "e0050e6a-74d4-4c45-9c87-3dd55d038500" },
	{ src: image7, id: "3d4b9879-095a-42d9-959a-41c8cccf0ea4" },
	{ src: image8, id: "31a0fba1-1b80-4c6f-a8e9-cdf755c6d9b4" },
	{ src: image9, id: "f9e1a3b4-bd7b-4d53-85c2-8c83e19ef995" },
	{ src: image10, id: "5d63d9d3-06d9-4bbf-96da-5f0eb1cd3c7f" },
	{ src: image11, id: "bd149c3b-3a12-4c95-a43f-8ef4e2498a58" },
];

export default images;
