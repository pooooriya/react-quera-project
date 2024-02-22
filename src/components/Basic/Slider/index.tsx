import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface SliderProps {
  images: string[];
}
export const Slider: React.FC<SliderProps> = ({ images }): JSX.Element => {
  return (
    <Swiper slidesPerView={1}>
      {images?.map((image) => (
        <SwiperSlide key={image}>
          <img src={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
