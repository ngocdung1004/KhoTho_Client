import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../FooterDiv/Footer';
import NavBar from '../NavBar/NavBar';
import * as config from "../../config.jsx"; // Ensure this file contains the correct API URL
import { useNavigate } from "react-router-dom";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import HandymanIcon from '@mui/icons-material/Handyman';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AvTimerIcon from '@mui/icons-material/AvTimer';

import "./styles/Jobs.css"

const Jobs = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[85%] m-auto bg-white">
      <NavBar/>
      
      <section id="services" className="section-padding white-color-sl">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title wow fadeInDown" data-wow-delay="0.3s">CHÚNG TÔI ĐANG QUẢNG BÁ</h2>
          <div className="shape wow fadeInDown" data-wow-delay="0.3s"></div>
        </div>
        <div className="row">

          <div className="col-md-6 col-lg-4 col-xs-12 white-color-sl">
            <div className="services-item wow fadeInRight" data-wow-delay="0.3s" onClick={() => navigate("/jobs")}>
              <div className="icon">
                <CleaningServicesIcon fontSize="large"/>
              </div>
              <div className="services-content">
                <h3><a>DỌN DẸP</a></h3>
                <p>Các công việc vệ sinh liên quan đến làm sạch ngôi nhà của bạn</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xs-12 white-color-sl" >
            <div className="services-item wow fadeInRight" data-wow-delay="0.6s" onClick={() => navigate("/jobs")}>
              <div className="icon">
                <BabyChangingStationIcon fontSize="large"/>
              </div>
              <div className="services-content">
                <h3><a>GIỮ TRẺ</a></h3>
                <p>Đây là sự lựa chọn tuyệt vời cho nhưng gia đình bận rộn, những đứa trẻ luôn là sự quan tâm hàng đầu</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xs-12 white-color-sl">
            <div className="services-item wow fadeInRight" data-wow-delay="0.9s" onClick={() => navigate("/jobs")}>
              <div className="icon">
                <HandymanIcon fontSize="large"/>
              </div>
              <div className="services-content">
                <h3><a>SỬA CHỮA</a></h3>
                <p>Sửa các thiết bị đang bị hỏng tại nhà, hoặc các vấn đề bất ngờ đối với xe của bạn</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xs-12 white-color-sl">
            <div className="services-item wow fadeInRight" data-wow-delay="1.2s" onClick={() => navigate("/jobs")}>
              <div className="icon">
                <FastfoodOutlinedIcon fontSize="large"/>
              </div>
              <div className="services-content">
                <h3><a>COOK</a></h3>
                <p>Có rất nhiều người mang tài năng nấu nướng, bạn có thể đặt lịch hẹn để có được bữa ăn thú vị hơn</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xs-12 white-color-sl">
            <div className="services-item wow fadeInRight" data-wow-delay="1.5s" onClick={() => navigate("/jobs")}>
              <div className="icon">
                <DriveEtaIcon fontSize="large"/>
              </div>
              <div className="services-content">
                <h3><a>DRIVER</a></h3>
                <p>Các anh tài xế sẽ đưa bạn về nhà an toàn sau những cuộc nhậu</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xs-12 white-color-sl">
            <div className="services-item wow fadeInRight" data-wow-delay="1.8s" onClick={() => navigate("/jobs")}>
              <div className="icon">
                <AvTimerIcon fontSize="large" />
              </div>
              <div className="services-content">
                <h3><a>CÔNG VIỆC THEO GIỜ</a></h3>
                <p>Bạn đang cần gấp người khuân vác hàng hóa, hỗ trợ sự kiện, có rất nhiều người cần công việc đó.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


      <Footer />
    </div>
  );
};

export default Jobs;
