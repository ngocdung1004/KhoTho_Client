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
    <Container style={{padding: '50px'}}>
    <Row style={{paddingTop: '50px'}}>
        <Col md={12} className="contact-social">
          <div className='contact-text'>
          <h1 >Tìm tôi trên</h1>
          <p>
          Xin đừng ngần ngại liên hệ với tôi và <span className="yellow">kết nối.</span>
          </p>
          </div>
          <ul className="contact-social-links">
            <li className="contact-icons">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="icon-color  contact-social-icons"
              >
                <AiFillFacebook />
              </a>
            </li>
            <li className="contact-icons">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="icon-color  contact-social-icons"
              >
                <FaFacebookMessenger />
              </a>
            </li>
            <li className="contact-icons">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="icon-color  contact-social-icons"
              >
                <SiGmail />
              </a>
            </li>
            <li className="contact-icons">
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="icon-color contact-social-icons"
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