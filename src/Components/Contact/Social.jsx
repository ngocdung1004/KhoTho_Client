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
    <Container style={{padding: '30px'}}>
    <Row>
              <Col md={12} className="contact-social">
                <div className='contact-text'>
                <h1>FIND ME ON</h1>
                <p>
                Please don't hesitate to reach out to me and <span className="yellow">connect.</span>
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