import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
    const { speciality } = useParams()
    const { doctors } = useContext(AppContext)

    const [filterDoc, setFilterDoc] = useState([])

    const navigate = useNavigate();

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase()))
        } else {
            setFilterDoc(doctors)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                
                {/*----------- left side (Filters) ------------------ */}
                <div className='flex flex-col text-gray-600 gap-4 text-sm'>
                    <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? "bg-indigo-100 text-black":""}`}>General physician</p>

                    <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? "bg-indigo-100 text-black":""} `}>Gynecologist</p>

                    <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? "bg-indigo-100 text-black":""} `}>Dermatologist</p>

                    <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians') }  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? "bg-indigo-100 text-black":""}`}>Pediatricians</p>

                    <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist') }  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? "bg-indigo-100 text-black":""} `}>Neurologist</p>

                    <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist') }  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? "bg-indigo-100 text-black":""} `}>Gastroenterologist</p>
                </div>

                {/*----------- right side (Doctor Cards) ------------------ */}
                <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 gap-y-6'>
                    {
                        filterDoc.map((item, index) => {
                            // Ensure availability is treated correctly (1, "1", or true)
                            const isAvailable = item.available == 1 || item.available === true;

                            return (
                                <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-2.5 duration-500 '>
                                    <img className='bg-blue-50 w-full' src={item.image} alt="" />
                                    <div className='p-4'>
                                        {/* --- UPDATED DYNAMIC AVAILABILITY --- */}
                                        <div className={`flex items-center gap-2 text-sm text-center ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                                            <p className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></p>
                                            <p>{isAvailable ? 'Available' : 'Not Available'}</p>
                                        </div>
                                        <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Doctors