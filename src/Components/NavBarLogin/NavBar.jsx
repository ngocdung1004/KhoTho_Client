import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "./styles/NavBar.css";
import avatar1 from '../../Assets/user/avatar-1.jpg';
import { useNavigate } from "react-router-dom";
import {AiFillInstagram} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'


const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedInvalue, setIsLoggedInvalue] = useState(true);
  const [userTypevalue, setUserTypevalue] = useState(null);

  useEffect(() => {
    // Khởi tạo trạng thái từ localStorage
    const authToken = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    setIsLoggedInvalue(!!authToken);
    setUserTypevalue(userType ? parseInt(userType, 10) : null);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    setIsLoggedInvalue(false); // Cập nhật trạng thái
    setShowDropdown(false);
    navigate("/"); // Điều hướng sau khi đăng xuất
  };

  return (
    <div className="navBar">

      <div className="navBarTop">
        <small className="navBarTopcontact-email">khotho.24h@gmail.com</small>
        <div className="navBarTopsocial-icons">
          <AiFillInstagram className="icon instagram" />
          <a href="https://www.facebook.com/profile.php?id=61567859981143" target="_blank" rel="noopener noreferrer">
          <BsFacebook className="icon facebook" />
          </a>
          <BsLinkedin className="icon linkedin" />
        </div>
      </div>

      <div className="navBarBottom">
        <div className="logoDiv">
          <h1 className="logo text-[25px] text-blueColor logo-flex">
            <Link 
              to="/"  className="flex logoKHOTHO">
                <div className="logo-font-blue">Kho</div>
                <div className="logo-font-yellow">Tho</div>
            </Link>
          </h1>
        </div>

        <div className="menu flex gap-8">
          {userTypevalue !== 2 && (
            <Link to="/registerworker" className="menuList highlightLink text-[#6f6f6f] hover:text-blueColor">
              <FontAwesomeIcon icon={faStar} className="highlightIcon" />
              Bắt đầu nhận việc
            </Link>
          )}

          <Link to="/jobs" className="menuList text-[#6f6f6f] hover:text-blueColor">Công việc</Link>
          <Link to="/aboutlogin" className="menuList text-[#6f6f6f] hover:text-blueColor">Giới thiệu</Link>
          <Link to="/contactlogin" className="menuList text-[#6f6f6f] hover:text-blueColor">Liên hệ</Link>

          {!isLoggedInvalue && (
            <>
              <Link to="/login" className="menuList text-[#6f6f6f] hover:text-blueColor">
                Đăng nhập
              </Link>
              <Link to="/register" className="menuList text-[#6f6f6f] hover:text-blueColor">
                Đăng ký
              </Link>
            </>
          )}

          {isLoggedInvalue && (
            <div className="relative">
              <img
                className="rounded-full w-10 mr-2 cursor-pointer"
                src={avatar1}
                alt="avatar"
                onClick={toggleDropdown}
              />
              {showDropdown && (
    <div className="custom-dropdown">
      <Link 
        to="/profile" 
        className="custom-dropdown-item"
      >
        Thông tin cá nhân
      </Link>
      <Link 
        to="/ordermanagement" 
        className="custom-dropdown-item"
      >
        Quản lí đơn
      </Link>
      <Link 
        to="/settings" 
        className="custom-dropdown-item"
      >
        Cài đặt
      </Link>
      <hr className="custom-dropdown-divider" />
      <button 
        onClick={handleLogout}
        className="custom-dropdown-item custom-dropdown-logout"
      >
        Đăng xuất
      </button>
    </div>
  )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
