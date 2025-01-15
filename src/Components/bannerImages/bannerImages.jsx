import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Import CSS Swiper


const bannerImages = [
  "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-quang-cao-du-lich-ky-nghi_113659754.jpg",
  "https://toursingmal.com/wp-content/uploads/2020/02/quy-nhon-phu-yen.png",
  "https://www.travelplusvn.com/public/uploads/upload_kcfinder/files/BannerCondao1-01.png",
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
        {bannerImages.map((image, index) => (
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