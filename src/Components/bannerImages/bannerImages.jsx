import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Import CSS Swiper


const bannerImages = [
  "https://i.imgur.com/hrwzs0q.png",
  "https://i.imgur.com/ubjvOuc.png",
  "https://i.imgur.com/WOBwwlK.png",
  "https://i.imgur.com/RT2FvB8.png"
];


const Banner = () => {
  return (
    <div className="mb-0">
      <Swiper
        modules={[Autoplay, Pagination]} // Sử dụng Autoplay và Pagination module
        spaceBetween={30}
        autoplay={{
          delay: 3000, // Thời gian chạy giữa các slide
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
      >
        {Array.isArray(bannerImages) && bannerImages?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-auto max-h-[730px] object-cover"
              style={{ aspectRatio: "3456 / 1414" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


export default Banner;