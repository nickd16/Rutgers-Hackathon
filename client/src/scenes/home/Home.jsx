import React from 'react'
import "./Home.css";
import { Navbar, Main } from '../../components/components';
const Home = () => {
  return (
    <div className='home-container'>
      <div>
      <Navbar />
      </div>
        
        <Main />
    </div>
  )
}

export default Home