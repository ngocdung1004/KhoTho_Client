import React from 'react'
import {AiFillInstagram} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='footer p-[5rem] mb-4 bg-blueColor rounded-[10px] gap-8 grid grid-cols-5 m-auto items-start justify-center'>

      <div className="">
        <div className="logoDiv">
        <h1 className="logo text-[25px] text-white pb-[1.5rem]"> <strong>Kho</strong>Tho
        </h1>
        </div>
        <p className="text-white pb-[13px] opacity-70 leading-7">
        Kết nối nhanh thợ và người cần, từ sửa chữa đến dọn dẹp, giúp lao động phổ thông có việc làm ngay, thu nhập liền tay, không cần CV
        </p>
      </div>

      <div className="grid">
        <span className='divTitle text-[18px] font-semibold pb-[1.5rem] text-white' >Công ty 
        </span>
        <div className="grid gap-3">
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Giới thiệu </li>
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Chức năng </li>
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Blog </li>
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> FAQ </li>
      </div>
      </div>

      <div className="grid">
        <span className='divTitle text-[18px] font-semibold pb-[1.5rem] text-white' >Nguồn lực 
        </span>
        <div className="grid gap-3">
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Tài khoản </li>
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Trung tâm hỗ trợ</li>
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Feedback </li>
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Thông tin liên lạc </li>
      </div>
      </div>

      <div className="grid">
        <span className='divTitle text-[18px] font-semibold pb-[1.5rem] text-white' >Hỗ trợ 
        </span>
        <div className="grid gap-3">
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Sự kiện </li>
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Khuyến khích </li>
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Req Demo </li>
        <li className="text-white opacity-[0.7] hover:opacity-[1]"> Nghề nghiệp </li>
      </div>
      </div>

      <div className="grid">
        <span className='divTitle text-[18px] font-semibold pb-[1.5rem] text-white' >Thông tin liên lạc 
        </span>
        <div>
          <small className='text-[14px] text-white'>
            khotho.24h@gmail.com
          </small>
          <div className='icons flex gap-4 py-[1rem]'>
            <AiFillInstagram className='bg-white p-[8px] w-[35px] h-[35px] rounded-full icon text-blueColor'/>
            <BsFacebook className='bg-white p-[8px] w-[35px] h-[35px] rounded-full icon text-blueColor'/>
            <BsLinkedin className='bg-white p-[8px] w-[35px] h-[35px] rounded-full icon text-blueColor'/>
          </div>
       
        </div>
        </div>
      

    </div>
  )
}

export default Footer