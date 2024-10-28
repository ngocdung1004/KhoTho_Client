import React from 'react'
import NavBar from '../NavBar/NavBar'
import ContactForm from '../Contact/Contact';
import Social from '../Contact/Social';
import Footer from '../FooterDiv/Footer'
import { Container } from "react-bootstrap";


const Contact = () => {


  return (
    <div className='w-[85%] m-auto bg-white'>
        <NavBar/>
        <Container>
          <ContactForm />
          <Social />
        </Container>
        <Footer/>
    </div>
  )
}

export default Contact
