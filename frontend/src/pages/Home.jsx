import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools';  // Correct import
import Testimonials from '../components/Testimonials'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
   return (
  <>    
      <div className='bg-gradient-to-r from-green-50 via-green-100 to-sky-50'>
      <Navbar />
      <Hero />
      <AiTools/>
      <Testimonials/>
      <Plan/>
      <Footer/>

      </div>
    </>
  );
}

export default Home