import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import ProfilePic from '../assets/profile_pic.png'
import DropDown from '../assets/dropdown_icon.svg'

const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMemnu] = useState(false)
    const [token, setToken] = useState(true)

    return (
        <div className='flex items-center justify-between py-4 mb-5 border-b border-b-gray text-sm'>
            <img onClick={()=>navigate('/')} className='w-44 cursor-pointer ml-1' src={assets.logo} alt="Logo" />

            <ul className='hidden md:flex items-start  gap-5 font-medium'>
                <NavLink to="/">
                    <li>HOME</li>
                    <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-blue-400 hidden' />
                </NavLink>

                <NavLink to="/doctors">
                    <li>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-blue-400 hidden' />
                </NavLink>

                <NavLink to="/about">
                    <li>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-blue-400 hidden' />
                </NavLink>

                <NavLink to="/contact">
                    <li>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-blue-400 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-4 mr-1'>

                {
                    token ? 
                    <div className='flex items-center gap-2 group relative pointer-coarse:'>
                        <img className='w-8 rounded-full' src={ProfilePic} alt="" />
                        <img className='w-2.5' src={DropDown} alt="" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-200 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointment</p>
                                <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout </p>
                            </div>
                        </div>
                    </div>
                    :<button onClick={()=> navigate('/login')} className='bg-blue-400 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
                }
            </div>
        </div>
    )
}

export default Navbar
