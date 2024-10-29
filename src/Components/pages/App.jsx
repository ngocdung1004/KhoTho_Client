import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Card, Table, Row } from 'react-bootstrap';

import Footer from '../FooterDiv/Footer'
import Jobs from '../JobDiv/Jobs'
import NavBar from '../NavBar/NavBar'
import Search from '../SearchDiv/Search'
import Value from '../ValueDiv/Value'
import axios from 'axios';
import * as config from "../../config.jsx";


  

const App = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    axios.get(config.url_get_worker)
      .then(response => {
        console.log(response.data)
        setWorkers(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className='w-[85%] m-auto white-color-sl'>
     <NavBar/>
     <Search/>
     <Jobs/>
     <Value/>
     <Footer/>
    </div>
  )
}

export default App