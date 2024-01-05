import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const res = await fetch('/api/auth/sign-up', {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  return (
    <div className='p-1' style={{ background: "#84fab0", height: "42rem" }}>
      <div className='p-10 mt-10 max-w-lg mx-auto border rounded-lg ' style={{ marginTop: "7rem", background: "#39383d" }}>
        <h1 className='text-3xl text-center font-semibold text-white my-7'>Sign-Up</h1>
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input onChange={handleChange} type="text" id='username' placeholder='username' className='border p-3 rounded-lg' />
          <input onChange={handleChange} type="email" id='email' placeholder='email' className='border p-3 rounded-lg' />
          <input onChange={handleChange} type="password" id='password' placeholder='password' className='border p-3 rounded-lg' />
          <button className='bg-green-700 font-semibold  rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80 text-white'>{loading ? 'loading...' : 'Sign-Up'}</button>
          <OAuth />
        </form>
        <div className='flex gap-2 mt-5 text-white'>
          <p>Have a account?</p>
          <Link to={'/sign-in'}>
            <span className='text-blue-700'>sign-in</span></Link>
        </div>
        {error && <p className='text-red-700 text-sm'>{error}</p>}
      </div>
    </div>

  )
}
export default SignUp