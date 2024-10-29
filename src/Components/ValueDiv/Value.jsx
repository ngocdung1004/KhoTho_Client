import React from 'react';

import simple from '../../Assets/simple.png';
import valentine from '../../Assets/valentine.png';
import shield from '../../Assets/shield.png';
import image1 from '../../Assets/images/1.jpg'; // Import the new image

const Value = () => {
  return (
       
    <div className='mb-[4rem] mt-[6rem]'>
      {/* Centering the h1 inside a flex container */}
      <div className="flex justify-center mb-[2rem]">
        <h1 className='text-red-500 text-[40px] font-bold w-[700px] text-center'>
          An tâm với sự lựa chọn của bạn 
        </h1>
        
      </div>
      
      <div className="flex justify-center mb-[3rem]"> {/* Flexbox for centering */}
        <img src={image1} alt="An tâm với sự lựa chọn của bạn" className='w-[1200px] h-auto rounded-[20px]' />
      </div>

      <div className="grid gap-[10rem] grid-cols-3 items-center">
        <div className="singleGrid rounded-[10px] hover:bg-[#E7F5FF] p-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-[4px] rounded-[.8rem] bg-[#dedef8] h-[40px] w-[40px] flex items-center justify-center">
              <img src={simple} alt='' className='w-[90%]'/>
            </div>
            <span className='font-semibold text-textColor text-[18px]'> 
              Đặt lịch nhanh chóng
            </span>
          </div>
          <p className='text-[13px] text-textColor opacity-[0.7] py-[1rem] font-semibold'>
            Thao tác 60 giây trên ứng dụng, có ngay người nhận việc sau 60 phút.
          </p>
        </div>

        <div className="singleGrid rounded-[10px] hover:bg-[#f7edf5] p-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-[4px] rounded-[.8rem] bg-[#F4C2E0] h-[40px] w-[40px] flex items-center justify-center">
              <img src={valentine} alt='' className='w-[90%]'/>
            </div>
            <span className='font-semibold text-textColor text-[18px]'> 
              Đa dạng dịch vụ
            </span>
          </div>
          <p className='text-[13px] text-textColor opacity-[0.7] py-[1rem] font-semibold'>
            Với các dịch vụ tiện ích, KhoTho sẵn sàng hỗ trợ mọi nhu cầu việc nhà của bạn.
          </p>
        </div>

        <div className="singleGrid rounded-[10px] hover:bg-[#fcfae3] p-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-[4px] rounded-[.8rem] bg-[#FFE8A7] h-[40px] w-[40px] flex items-center justify-center">
              <img src={shield} alt='' className='w-[90%]'/>
            </div>
            <span className='font-semibold text-textColor text-[18px]'> 
              An toàn tối đa
            </span>
          </div>
          <p className='text-[13px] text-textColor opacity-[0.7] py-[1rem] font-semibold'>
            Người làm uy tín, luôn có hồ sơ lý lịch rõ ràng.
          </p>
        </div>
      </div>

      <div className="card mt-[2rem] flex justify-between bg-blueColor p-[5rem] rounded-[10px]">
        <div>
          <h1 className='text-blueColor text-[30px] font-bold'> Ready to switch a career</h1>
        </div>
        <button className='border-[2px] rounded-[10px] py-[4px] px-[50px] text-[18px] font-semibold text-blueColor hover:bg-white border-blueColor'>
          Get Started 
        </button>
      </div>
    </div>
  )
}

export default Value;
