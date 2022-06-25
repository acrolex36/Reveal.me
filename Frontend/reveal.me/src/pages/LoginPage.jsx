import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LogoLogin from '../images/login.png'
import { useCookies } from 'react-cookie'

// export function saveTokenInLocalStorage(token) {
//   localStorage.setItem("Token", JSON.stringify(token));
// }

//function logout(){
//   localStorage.removeItem("Token")
//  return ......
// }

const LoginPage = () => {

  const [email, setEmail] = useState(null);
  const [plainTextPassword, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [ cookies, setCookie, removeCookie] = useCookies(null);

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await axios
      .post(`http://localhost:5000/api/auth/login`, { email, plainTextPassword })
      .then(function(response){
        if(response.status == 201){
          // saveTokenInLocalStorage(response.data.token);

          setCookie("UserId", response.data.userId);
          setCookie("Email", response.data.email);
          setCookie("Token", response.data.token);

          navigate ('/');
          // navigate ('/create_profile');
        }
      })
      .catch(function(res){
        if(res.response.status == 400){
          navigate ('/login');
          setError('Invalid username or password"');
        }
      });

        // window.location.reload()

    } catch (error) {
        console.log(error)
    }

}

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
          <a href="http://localhost:3000/register" className="font-medium text-darker-pink hover:text-pink-100">
            Register
          </a>
        </p>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

          <div className='flex flex-col justify-center'>
            <div className='flex justify-center mb-2'>
            <button
              type="submit"
              className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
            </div>
            <div className="text-center text-sm">
              <a href="http://localhost:3000/login/forgot_password" className="font-medium text-indigo-600 hover:text-darker-pink">
                Forgot your password?
              </a>
              <p>{error}</p>
            </div>
          </div>
        </form>
      </div> 
    </div>
    </div>
  )
}

export default LoginPage