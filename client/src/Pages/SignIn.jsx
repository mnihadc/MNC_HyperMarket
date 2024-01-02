import React from 'react'
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className='p-1' style={{ background: "#90fab7", height: "42rem" }}>
      <div className='p-10 max-w-lg mx-auto rounded-lg' style={{ marginTop: "7rem", background: "#39383d" }}>
        <h1 className='text-3xl my-7 text-center font-semibold' style={{ color: "#fff" }}>Sign-In</h1>
        <form className='flex flex-col gap-4 '>
          <input type="email" placeholder='email' className='border p-3 rounded-lg' />
          <input type="password" placeholder='password' className='border p-3 rounded-lg' />
          <button className='bg-green-700 p-3 rounded-lg text-white font-semibold uppercase hover:opacity-95 disabled:opacity-80'>Sign In</button>
        </form>
        <div className='flex gap-3 mt-5 text-white'>
          <p>Dont have account</p>
          <Link to={'/sign-up'}>
            <span className='text-blue-700'>Sign-up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
