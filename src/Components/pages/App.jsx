import React from 'react'
import Footer from '../FooterDiv/Footer'
import Jobs from '../JobDiv/Jobs'
import NavBar from '../NavBar/NavBar'
import Search from '../SearchDiv/Search'
import Value from '../ValueDiv/Value'

const App = () => {
  return (
    <div className='w-[85%] m-auto bg-white'>
     <NavBar/>
     <Search/>
     <Jobs/>
     <Value/>
     <Footer/>
    </div>
  )
}

export default App
