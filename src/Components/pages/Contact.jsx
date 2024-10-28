import React from 'react'
import NavBar from '../NavBar/NavBar'
import ContactForm from '../Contact/Contact';
import Social from '../Contact/Social';
import Footer from '../FooterDiv/Footer'
import { Container } from "react-bootstrap";

import "./styles/Contact2.css"

const Contact = () => {


  return (
    <div className='w-[85%] m-auto white-color-sl'>
        <NavBar/>
        <Container className='white-color-sl'>
          <ContactForm />
          <section id="contact" className="section-padding bg-gray">
          <div className="container">
            <div className="section-header text-center white-color-sl">
              <h2 className="section-title wow fadeInDown" data-wow-delay="0.3s">Liên hệ với chúng tôi</h2>
              <div className="shape wow fadeInDown" data-wow-delay="0.3s"></div>
            </div>
            <div className="row contact-form-area wow fadeInUp " data-wow-delay="0.3s">
              <div className="col-lg-7 col-md-12 col-sm-12 ">
                <section id="cta" className="section-padding">
                  <div className="container white-color-sl">
                    <div className="row ">
                      <div className="col-lg-6 col-xs-12 wow fadeInLeft" data-wow-delay="0.3s">
                        <div className="cta-text">
                          <h4 className='cta-text-h4'>Chúng tôi luôn sẵn sàng để hỗ trợ bạn</h4><br />
                          <h5 className='cta-text-h5'>Trụ sở của của tôi được chia sẻ công khai, bạn cần hỗ trợ trực tiếp, hãy tìm kiếm và chúng tôi luôn luôn chào đón.</h5>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xs-12 text-right wow fadeInRight" data-wow-delay="0.3s">
                        <a rel="nofollow" href="https://rebrand.ly/fusion-ud" className="btn btn-common">Liên hệ ngay</a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
      <div className="col-lg-5 col-md-12 col-xs-12">
        <div className="map">
          <iframe
            style={{ border: 0, height: '280px', width: '100%' }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.584811421889!2d109.21657047468118!3d13.803884386593419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6bf778c80973%3A0x8a7d0b5aa0af29c7!2zxJDhuqFpIGjhu41jIEZQVCBRdXkgTmjGoW4!5e0!3m2!1svi!2sus!4v1730099591225!5m2!1svi!2sus" 
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

          
          <div className="container ">
            <div className="row ">
              <div className="col-lg-6 col-xs-12 wow fadeInLeft " data-wow-delay="0.3s">           
                <div className="cta-text">
                  <h4 className='cta-text-h4'>Hãy dùng thử miễn phí</h4><br />
                  <p className='cta-text-p'>Hãy quảng bá khả năng của bạn trên nền tản của chúng tôi, nó hoàn toàn miễn phí cho đến khi bạn có đơn đầu tiên.</p>
                </div>
              </div>
              <div className="col-lg-6 col-xs-12 text-right wow fadeInRight" data-wow-delay="0.3s">
                <a href="#" className="btn btn-common">Đăng ký</a>
              </div>
            </div>
          </div>

          <Social />
        </Container>
        <Footer/>
    </div>
  )
}

export default Contact
