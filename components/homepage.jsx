import React from 'react'
import HeroSection from './hero-section'
import LatestBlogs from './latest-blogs'
import CategorySection from './category-section'
import Newsletter from './newsletter'

const Homepage = () => {
  return (
    <section className=''>
        <HeroSection/>
        <LatestBlogs/>
        <CategorySection/>
        <Newsletter/>
    </section>
  )
}

export default Homepage