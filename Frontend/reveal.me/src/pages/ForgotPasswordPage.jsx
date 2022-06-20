import React from 'react'
import LogoForgotPassword from '../images/forgot_password.png'
const ForgotPasswordPage = () => {
  return (
    <div className='bg-pink-100 flex flex-col justify-center min-h-screen py-2'>
    <main className='flex flex-col items-center justify-center w-full flex-1 px-20'>
    <div className='bg-pink-50 rounded-2xl shadow-2xl flex w-5/6 max-w-4xl'>
      <div className='w-2/5' >{/*Forgot Password Logo */}
        <div className='p-12'>
          <p>reveal.me</p>
          <p>reveal you, reveal us!</p>
        </div>
        <img src={LogoForgotPassword} alt="" className='w-15'/>
      </div>
      <div className='w-3/5 mx-5 p-14 mb-5'>{/*Forgot Password Field */}
        <h2 className="mt-6 text-2xl text-gray-900">Forgot Password?</h2>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-2xl shadow-sm -space-y-px">
            <div>
              <label htmlFor="email">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div className="rounded-2xl shadow-sm -space-y-px">
            <div>
              <label htmlFor="new password">
                New Password
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
        <div className="rounded-2xl shadow-sm -space-y-px">
            <div>
              <label htmlFor="confirm new password">
                Confirm New Password
              </label>
              <input
                id="confirm-new-password"
                name="confirm-new-password"
                type="password"
                autoComplete="confirm-new-password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className="group relative w-fit flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div> 
    </div>
    </main>
    </div>
  )
}

export default ForgotPasswordPage