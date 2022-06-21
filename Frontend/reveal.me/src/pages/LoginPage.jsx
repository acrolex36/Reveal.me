import React from 'react'
import LogoLogin from '../images/login.png'
const LoginPage = () => {
  return (
    // <div className='bg-pink flex flex-col justify-center min-h-screen py-2'>
    <div className='flex flex-col items-center justify-center min-h-screen w-full px-20 bg-pink-100'>
    <div className='w-full bg-pink-50 rounded-2xl shadow-2xl flex w-5/6 max-w-4xl'>
      <div className='w-2/5' >{/*Sign in Logo */}
        <div className='p-12 mb-10'>
          <p>reveal.me</p>
          <p>reveal you, reveal us!</p>
        </div>
        <img src={LogoLogin} alt="" className='w-50 ml-4'/>
      </div>
      <div className='w-3/5 p-14 mx-5 mb-5'>{/*Sign in Field */}
        <h2 className="mt-6 text-2xl text-gray-900">Log in to Reveal.me</h2>
        <p className="mt-2 text-sm text-gray-600">No Account yet?{' '}
          <a href="http://localhost:3000/register" className="font-medium text-darker-pink hover:text-indigo-500">
            Register
          </a>
        </p>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-2xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div className="rounded-2xl shadow-sm -space-y-px">
            <div>
              <label htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-2xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div className='flex justify-center'>
            <button
              type="submit"
              className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <div className='flex justify-center'>
          <button
              type="submit"
              className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create an Account
            </button>
          </div>
            <div className="text-center text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
        </form>
      </div> 
    </div>
    </div>
  )
}

export default LoginPage