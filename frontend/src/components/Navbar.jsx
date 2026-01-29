import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom' // Added useLocation
import { assets } from '../assets/assets'
import ProfilePic from '../assets/profile_pic.png' 
import DropDown from '../assets/dropdown_icon.svg'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Used to trigger useEffect on page changes
    
    const [token, setToken] = useState(localStorage.getItem('userToken') ? true : false)
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '')
    const [userImage, setUserImage] = useState(localStorage.getItem('userImage') || '')

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImage');
        setToken(false);
        setUserName('');
        setUserImage('');
        navigate('/login');
    };

    // Re-sync states whenever the URL changes (navigation)
    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        const storedName = localStorage.getItem('userName');
        const storedImage = localStorage.getItem('userImage');
        
        setToken(storedToken ? true : false);
        setUserName(storedName || '');
        setUserImage(storedImage || ''); 
    }, [location]); // Depend on location so it refreshes after login/signup redirect

    return (
        <div className='flex items-center justify-between py-4 mb-5 border-b border-b-gray text-sm'>
            <img onClick={() => navigate('/')} className='w-44 cursor-pointer ml-1' src={assets.logo} alt="Logo" />

            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to="/">
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-blue-400 hidden' />
                </NavLink>
                <NavLink to="/doctors">
                    <li className='py-1'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-blue-400 hidden' />
                </NavLink>
                <NavLink to="/about">
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-blue-400 hidden' />
                </NavLink>
                <NavLink to="/contact">
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-blue-400 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-4 mr-1'>
                {
                    token ?
                    <div className='flex items-center gap-2 group relative cursor-pointer'>
                        <p className='hidden lg:block font-medium text-gray-600'>
                            {localStorage.getItem('userRole') === 'doctor' ? `Dr. ${userName}` : userName}
                        </p>
                        
                        <img 
                            className='w-8 h-8 rounded-full object-cover border border-gray-200' 
                            src={userImage && userImage !== "" ? userImage : ProfilePic} 
                            alt="Profile" 
                        />
                        
                        <img className='w-2.5' src={DropDown} alt="" />
                        
                        {/* Dropdown Menu */}
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-md border border-gray-100'>
                                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointment</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer text-red-500 font-semibold border-t pt-2'>Logout</p>
                            </div>
                        </div>
                    </div>
                    : <button onClick={() => navigate('/login')} className='bg-blue-400 text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-blue-500 transition-all'>Create account</button>
                }
            </div>
        </div>
    )
}

export default Navbar