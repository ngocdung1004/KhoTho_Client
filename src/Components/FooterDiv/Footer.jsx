import React from 'react'
import {AiFillInstagram} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <h1 className="footer-logo">KhoTho</h1>
        <p className="footer-description">
          Kết nối nhanh thợ và người cần, từ sửa chữa đến dọn dẹp, giúp lao động phổ thông có việc làm ngay, thu nhập liền tay, không cần CV
        </p>
      </div>

      <div className="footer-section">
        <span className="footer-title">Công ty</span>
        <ul className="footer-links">
          <li>Giới thiệu</li>
          <li>Chức năng</li>
          <li>Blog</li>
          <li>FAQ</li>
        </ul>
      </div>

      <div className="footer-section">
        <span className="footer-title">Nguồn lực</span>
        <ul className="footer-links">
          <li>Tài khoản</li>
          <li>Trung tâm hỗ trợ</li>
          <li>Feedback</li>
          <li>Thông tin liên lạc</li>
        </ul>
      </div>

      <div className="footer-section">
        <span className="footer-title">Hỗ trợ</span>
        <ul className="footer-links">
          <li>Sự kiện</li>
          <li>Khuyến khích</li>
          <li>Req Demo</li>
          <li>Nghề nghiệp</li>
        </ul>
      </div>

      <div className="footer-section">
        <span className="footer-title">Thông tin liên lạc</span>
        <small className="contact-email">khotho.24h@gmail.com</small>
        <div className="social-icons">
          <AiFillInstagram className="icon instagram" />
          <a href="https://www.facebook.com/profile.php?id=61567859981143" target="_blank" rel="noopener noreferrer">
          <BsFacebook className="icon facebook" />
          </a>
          <BsLinkedin className="icon linkedin" />
        </div>
      </div>
    </div>
  )
}

export default Footer