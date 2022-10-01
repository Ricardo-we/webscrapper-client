import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";

interface SliderProps extends SwiperProps {
    items?: JSX.Element[];
}

export default function Slider({ items, ...props }: SliderProps) {

    return (
        <Swiper
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
            {...props}
        >
            {items?.map((item, index) => (
                <SwiperSlide
                    style={{ width: "100%" }}
                    className="flex-row items-center justify-center"
                    key={index}
                >
                    {item}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
