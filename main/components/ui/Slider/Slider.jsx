// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper";
import { Children, useRef } from "react";

export default function Slider({ children }) {
  const arrayChildren = Children.toArray(children);

  const swiperRef = useRef();

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={"auto"}
        pagination={{
          clickable: true,
        }}
        spaceBetween={20}
        className="simple-slider"
      >
        {arrayChildren.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
      <div
        role="button"
        className="slider-btn-prev"
        onClick={() => swiperRef.current?.slidePrev()}
      ></div>
      <div
        role="button"
        className="slider-btn-next"
        onClick={() => swiperRef.current?.slideNext()}
      ></div>
    </div>
  );
}
