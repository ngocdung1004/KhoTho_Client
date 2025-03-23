import React from 'react';

import simple from '../../Assets/simple.png';
import valentine from '../../Assets/valentine.png';
import shield from '../../Assets/shield.png';
import image1 from '../../Assets/images/1.jpg'; // Import the new image
import "./Value.css"
import { Link } from 'react-router-dom';

const Value = () => {
  return (
       
    <div className='mb-[4rem] mt-[6rem]'>
      {/* Centering the h1 inside a flex container */}
      <div className="animated-text">
      <div className="wrap">
        <div className="line">
          <div className="left">
            <div className="content">
              <span className="spanSlow">VIỆC LÀM GẤP</span>
            </div>
          </div>
          <div className="right">
            <div className="content">
              <span className="spanSlow">VIỆC LÀM GẤP</span>
            </div>
          </div>
        </div>
        <div className="line">
          <div className="left">
            <div className="content">
              <span className="spanSlow">THỢ TỚI TẤP</span>
            </div>
          </div>
          <div className="right">
            <div className="content">
              <span className="spanSlow">THỢ TỚI TẤP</span>
            </div>
          </div>
        </div>
      </div>
    </div>


      <div className="flex justify-center mb-[3rem]"> {/* Flexbox for centering */}
        <img src={image1} alt="An tâm với sự lựa chọn của bạn" className='w-[1200px] h-auto rounded-[20px]' />
      </div>

      <div className="grid gap-[5rem] grid-cols-1 md:grid-cols-3 items-center px-5">
  {[
    {
      imgSrc: simple,
      bgColor: "linear-gradient(45deg, #a8edea, #fed6e3)",
      hoverColor: "linear-gradient(135deg, #fdfcfb, #e2d1c3)",
      title: "Đặt lịch nhanh chóng",
      description: "Thao tác 60 giây trên ứng dụng, có ngay người nhận việc sau 60 phút.",
    },
    {
      imgSrc: valentine,
      bgColor: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
      hoverColor: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
      title: "Đa dạng dịch vụ",
      description: "Với các dịch vụ tiện ích, KhoTho sẵn sàng hỗ trợ mọi nhu cầu việc nhà của bạn.",
    },
    {
      imgSrc: shield,
      bgColor: "linear-gradient(45deg, #f6d365, #fda085)",
      hoverColor: "linear-gradient(135deg, #ffecd2, #fcb69f)",
      title: "An toàn tối đa",
      description: "Người làm uy tín, luôn có hồ sơ lý lịch rõ ràng.",
    },
  ].map((card, index) => (
    <div
      key={index}
      className={`singleGrid group relative rounded-[15px] p-[1.5rem] overflow-hidden cursor-pointer`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center rounded-[15px] transform scale-110 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
        style={{ backgroundImage: card.hoverColor }}
      ></div>
      <div className="relative z-10">
        {/* Glow Effect */}
        <div className="absolute inset-0 blur-[30px] opacity-30 transition-all duration-700" 
          style={{ background: card.bgColor }}></div>

        {/* Icon */}
        <div className="flex items-center gap-3">
          <div
            className="imgDiv p-[4px] rounded-[.8rem] flex items-center justify-center h-[50px] w-[50px] bg-gradient-to-r from-white to-transparent group-hover:animate-bounce"
          >
            <img
              src={card.imgSrc}
              alt=""
              className="w-[90%] group-hover:rotate-[20deg] group-hover:scale-125 transition-transform duration-700"
            />
          </div>
          <span className="font-semibold text-[20px] opacity-[0.8] transition-all duration-500">
            {card.title}
          </span>
        </div>

        {/* Description */}
        <p className="text-[14px] opacity-[0.8] py-[1rem] transition-all duration-500">
          {card.description}
        </p>
      </div>
    </div>
  ))}
</div>

      <div className="card-container">
        <div className="card-text">
          <h1>Trải nghiệm ngay hôm nay!</h1>
          <p>Nhanh chóng trải nghiệm dịch vụ tuyệt vời của chúng tôi</p>
        </div>
        <Link to="/registerworker" style={{ textDecoration: "none" }} className="card-button no-underline">
          Đăng ký
        </Link>

      </div>
    </div>

  )
}

export default Value;