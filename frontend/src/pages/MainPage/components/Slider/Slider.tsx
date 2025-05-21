import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import type { Swiper as SwiperType } from "swiper"

import "./Slider.scss"
import "swiper/scss"

import arrow from "../../../../assets/img/arrow.svg"

export const Slider: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="sliderBlock">
      <div className="sliderBlock__header">
        <h1>Transform audio into visual realities </h1>
        <div className="slider-btn">
          <button onClick={() => swiperRef.current?.slidePrev()} className="btn btn_prev">
            <img src={ arrow } alt="" />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()} className="btn btn_next">
            <img src={ arrow } alt="" />
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={40}
        slidesPerView={3.5}
        modules={[Navigation]}
        navigation={{
          prevEl: ".btn_prev",
          nextEl: ".btn_next",
        }}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <img src="" alt="" />
          Slide 1
        </SwiperSlide>
        <SwiperSlide>
          <img src="" alt="" />
          Slide 2
        </SwiperSlide>
        <SwiperSlide>
          <img src="" alt="" />
          Slide 3
        </SwiperSlide>
        <SwiperSlide>
          <img src="" alt="" />
          Slide 4
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Slider
