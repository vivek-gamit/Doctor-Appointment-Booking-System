import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [role, setRole] = useState('patient')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [speciality, setSpeciality] = useState('')
  // --- NEW: Image state for file upload ---
  const [image, setImage] = useState(null)

  // Redirect if user is already logged in
  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    if (userToken) {
      // Both patients and doctors go to the main doctors list/home
      navigate('/doctors')
    }
  }, [navigate])

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // --- NEW: Using FormData to handle text + images ---
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('speciality', speciality);

    if (image) {
      formData.append('image', image);
    }

    const endpoint = state === 'Sign Up'
      ? 'http://localhost/doctor-backend/signup.php'
      : 'http://localhost/doctor-backend/login.php';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        // Note: Browser automatically sets Content-Type for FormData
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert(result.message);

        // Save session data
        localStorage.setItem('userToken', 'logged_in');
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name || result.user?.name);

        // THIS LINE IS REQUIRED:
        if (result.user && result.user.image) {
          localStorage.setItem('userImage', result.user.image); //
        }

        navigate('/doctors');

      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the backend server.");
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>

        {/* Role Selector */}
        <div className='flex gap-4 mb-2'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input type="radio" name="role" value="patient" checked={role === 'patient'} onChange={() => setRole('patient')} /> Patient
          </label>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input type="radio" name="role" value="doctor" checked={role === 'doctor'} onChange={() => setRole('doctor')} /> Doctor
          </label>
        </div>

        {/* --- NEW: Image Upload UI --- */}
        {state === 'Sign Up' && (
          <div className='flex items-center gap-4 mb-2'>
            <label htmlFor="image" className='cursor-pointer'>
              <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border border-zinc-300 overflow-hidden'>
                {image ? <img src={URL.createObjectURL(image)} alt="profile" className='w-full h-full object-cover' /> : <p className='text-xs'>Upload</p>}
              </div>
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            <p className='text-zinc-500'>Profile Photo</p>
          </div>
        )}

        {state === 'Sign Up' && (
          <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" required />
          </div>
        )}

        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" required />
        </div>

        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" required />
        </div>

        {state === 'Sign Up' && role === 'doctor' && (
          <div className='w-full '>
            <p>Specialty</p>
            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border border-zinc-300 rounded w-full p-2 mt-1' required>
              <option value="">Select Specialty</option>
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
            </select>
          </div>
        )}

        <button className='bg-blue-400 text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-blue-400 underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-blue-400 underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login