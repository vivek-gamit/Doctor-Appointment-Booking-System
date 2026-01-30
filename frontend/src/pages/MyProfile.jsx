import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const { getDoctorsData } = useContext(AppContext); 

    const userRole = localStorage.getItem('userRole') || 'patient'

    const [userData, setUserData] = useState({
        name: localStorage.getItem('userName') || "New User",
        image: localStorage.getItem('userImage') || assets.profile_pic,
        email: localStorage.getItem('userEmail') || 'user@example.com',
        phone: '',
        address: {
            line1: '',
            line2: '',
        },
        gender: 'Not Specified',
        dob: '',
        // --- FIX 1: Load availability from localStorage ---
        available: localStorage.getItem('userAvailable') === 'false' ? false : true 
    })

    const loadUserProfile = async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) return;

        try {
            const response = await fetch(`http://localhost/doctor-backend/get_profile.php?email=${email}`);
            const result = await response.json();
            if (result.status === 'success') {
                setUserData(result.data);
                // Sync localStorage with database data
                localStorage.setItem('userAvailable', result.data.available);
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    }

    useEffect(() => {
        loadUserProfile();
    }, []);

    const handleSave = async () => {
        const profileData = {
            ...userData,
            role: userRole
        };

        try {
            const response = await fetch('http://localhost/doctor-backend/update_profile.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData),
            });

            const result = await response.json();

            if (result.status === 'success') {
                localStorage.setItem('userName', userData.name);
                localStorage.setItem('userEmail', userData.email);
                
                // --- FIX 2: Save availability to localStorage ---
                localStorage.setItem('userAvailable', userData.available);

                if (getDoctorsData) {
                    await getDoctorsData();
                }

                alert(result.message);
                setIsEdit(false);
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Failed to connect to the server.");
        }
    };

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <img className='w-36 rounded-full h-36 object-cover' src={userData.image} alt="Profile" />

            {isEdit
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 outline-blue-400 px-2' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            }

            <hr className='bg-zinc-400 h-px border-none' />

            {userRole === 'doctor' && (
                <div className='flex items-center gap-3 mt-2'>
                    <p className='font-medium text-neutral-500'>Availability Status:</p>
                    {isEdit ? (
                        <select
                            className='bg-gray-100 p-1 rounded outline-blue-400'
                            value={userData.available ? 'Available' : 'Not Available'}
                            onChange={(e) => setUserData(prev => ({ ...prev, available: e.target.value === 'Available' }))}
                        >
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    ) : (
                        <p className={`font-semibold ${userData.available ? 'text-green-500' : 'text-red-500'}`}>
                            {userData.available ? 'Available' : 'Not Available'}
                        </p>
                    )}
                </div>
            )}
            
            {/* ... rest of your UI code stays exactly the same ... */}
            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email id:</p>
                    {isEdit
                        ? <input className='bg-gray-100 max-w-52 px-1 outline-blue-400' type="email" onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))} value={userData.email} />
                        : <p className='text-blue-500'>{userData.email}</p>
                    }

                    <p className='font-medium'>Phone:</p>
                    {isEdit
                        ? <input className='bg-gray-100 max-w-52 px-1 outline-blue-400' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        : <p className='text-blue-400'>{userData.phone}</p>}

                    <p className='font-medium'>Address:</p>
                    {isEdit
                        ? <p>
                            <input className='bg-gray-50 px-1 border mb-1 outline-blue-400' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <br />
                            <input className='bg-gray-50 px-1 border outline-blue-400' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>
                        : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    }
                </div>
            </div>

            <div>
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit
                        ? <select className='max-w-20 bg-gray-100 outline-blue-400' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-400'>{userData.gender}</p>}

                    <p className='font-medium'>Birthday:</p>
                    {isEdit
                        ? <input className='max-w-28 bg-gray-100 outline-blue-400' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                        : <p className='text-gray-400'>{userData.dob}</p>}
                </div>
            </div>

            <div className='mt-10'>
                {
                    isEdit
                        ? <button onClick={handleSave} className='border border-blue-400 px-8 py-2 rounded-full hover:bg-blue-400 hover:text-white transition-all'>Save information</button>
                        : <button onClick={() => setIsEdit(true)} className='border border-blue-400 px-8 py-2 rounded-full hover:bg-blue-400 hover:text-white transition-all'>Edit</button>
                }
            </div>
        </div>
    )
}

export default MyProfile