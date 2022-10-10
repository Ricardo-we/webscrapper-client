import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

interface GallerySliderProps extends SwiperProps {
	items?: Array<any>;
}

export default function GallerySlider({ items, ...props }: GallerySliderProps) {
	return (
		<>
			<Swiper
				effect={"coverflow"}
				grabCursor={true}
				centeredSlides
				// slidesPerView={"auto"}
				coverflowEffect={{
					rotate: 30,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: false,
				}}
				pagination={true}
				modules={[EffectCoverflow, Pagination]}
				{...props}
			>
				{items?.map((item, index) => (
					<SwiperSlide
						className="flex flex-row items-center justify-center"
						key={index}
					>
						{item}
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
