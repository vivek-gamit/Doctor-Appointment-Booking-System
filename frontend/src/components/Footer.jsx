import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* --------------------- left side -------------------- */}
        <div>
            <img className='mb-2 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, magnam asperiores? Odio quo blanditiis iste, asperiores itaque voluptatibus tempore non optio. Vel harum aut quaerat. Inventore ullam repudiandae ut distinctio.</p>
        </div>

        {/* --------------------- left side -------------------- */}
        <div>
            <p className='font-medium text-xl mb-5'>COMPANY</p>

            <ul className='flex flex-col text-gray-600 gap-2'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        {/* --------------------- left side -------------------- */}
        <div>
            <p className='font-medium text-xl mb-5'>GET IN TOUCH</p>
            
            <ul className='flex flex-col text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>greatstackdev@gmail.com</li>
            </ul>
        </div>

      </div>

{/*---------- CopyRight text */}
      <div>
        <hr />
        <p className='py-5 text-center text-sm'>Copyright © 2024 GreatStack - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
