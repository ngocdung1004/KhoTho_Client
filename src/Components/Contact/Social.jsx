import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillFacebook,
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineTwitter
} from "react-icons/ai";
import { FaFacebookMessenger, FaLinkedinIn, FaPhone, FaTiktok } from "react-icons/fa";
import { SiGmail, SiLeetcode } from "react-icons/si";
import './Social.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsYoutube } from 'react-icons/bs';

const Social = () => {
  return (
    <Container style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f0f4f8' }}>
    <Row style={{ paddingTop: '50px' }}>
      <Col md={12} className="contact-social">
        <div className="contact-text mb-4">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Tìm tôi trên</h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>
            Xin đừng ngần ngại liên hệ với tôi và <span className="highlight">kết nối.</span>
          </p>
        </div>
        <ul className="contact-social-links d-flex justify-content-center" style={{ listStyleType: 'none', padding: 0 }}>
          <li className="contact-icons mx-2">
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="contact-social-icon facebook"
            >
              <AiFillFacebook />
            </a>
          </li>
          <li className="contact-icons mx-2">
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="contact-social-icon messenger"
            >
              <FaFacebookMessenger />
            </a>
          </li>
          <li className="contact-icons mx-2">
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="contact-social-icon gmail"
            >
              <SiGmail />
            </a>
          </li>
          <li className="contact-icons mx-2">
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="contact-social-icon phone"
            >
              <FaPhone />
            </a>
          </li>
        </ul>
      </Col>
    </Row>
    
  </Container>
  )
}

export default Social