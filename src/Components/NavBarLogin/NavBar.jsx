import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/NavBar.css";
import avatar1 from '../../Assets/user/avatar-1.jpg';

const NavBar = () => {
  return (
    <div className='navBar flex justify-between items-center p-[3rem]'>
      <div className="logoDiv">
        <h1 className="logo text-[25px] text-blueColor logo-flex"> 
        <div className="flex">
          <div className="logo-font-blue">Kho</div>
          <div className="logo-font-yellow">Tho</div>
      </div>
      </h1>
      </div>

      <div className="menu flex gap-8">
        <Link to="/jobs" className="menuList text-[#6f6f6f] hover:text-blueColor">Công việc</Link>
        <Link to="/customer" className="menuList text-[#6f6f6f] hover:text-blueColor">Khách hàng</Link>
        <Link to="/about" className="menuList text-[#6f6f6f] hover:text-blueColor">Tổng quan</Link>
        <Link to="/contact" className="menuList text-[#6f6f6f] hover:text-blueColor">Liên hệ</Link>
        <Link to="" className="menuList text-[#6f6f6f] hover:text-blueColor"><img
            className="rounded-full w-10 mr-2"
            src={avatar1}
            alt="avatar"
        /></Link>
      </div>
    </div>
  );
}

export default NavBar;
