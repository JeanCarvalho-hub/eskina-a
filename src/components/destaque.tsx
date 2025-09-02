"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "@/styles/destaque.css";

export default function Destaques() {
  return (
    <Swiper modules={[Pagination, Autoplay]} slidesPerView={1} spaceBetween={20} pagination={{ clickable: true }} autoplay={{
      delay: 5000,
      disableOnInteraction: false
    }} loop={true}>
      <SwiperSlide>
        <img src="/carrossel.png" alt="Produto 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/destaque-2.jpeg" alt="Produto 2" />
      </SwiperSlide>
    </Swiper>
  );
}
