import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LogoRegister from "../images/register.png"
import { useCookies } from 'react-cookie'

// export function saveTokenInLocalStorage(token) {
//   localStorage.setItem("Token", JSON.stringify(token));
// }

const RegisterPage = () => {
  const [first_name, setfirstname] = useState(null);
  const [last_name, setlastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [plainTextPassword, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  const [ cookies, setCookie, removeCookie] = useCookies(['user']);

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      if (plainTextPassword !== confirmPassword) {
        setError('Passwords need to match!')
        return
    }
        const response = await axios.post(`http://localhost:5000/api/auth/register`, { first_name, last_name, email, plainTextPassword, confirmPassword })
        .then(function(response){
          if(response.status == 201){
            // saveTokenInLocalStorage(response.data.token)

            setCookie("UserId", response.data.userId);
            // setCookie("Email", response.data.email);
            setCookie("Token", response.data.token);

            navigate ('/create_profile');
          }
        }).catch(function(res){
          navigate ('/register');
          if(res.response.status == 400){
            setError('invalid email or password');
          }
          if(res.response.status == 405){
            setError('Email already used');
          }
          if(res.response.status == 409){
            setError('Password too short min 6 char');
          }
        });

        // window.location.reload()

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className='bg-pink-100 flex flex-col justify-center min-h-screen py-2'>
    <main className='flex flex-col items-center justify-center w-full flex-1 px-20'>
    <div className='bg-pink-50 rounded-2xl shadow-2xl flex w-5/6 max-w-4xl'>
      <div className='w-2/5' >{/*Sign up Logo */}
        <div className='p-12'>
          <p>reveal.me</p>
          <p>reveal you, reveal us!</p>
        </div>
        <img src={LogoRegister} alt="" className='w-50'/>
      </div>
      <div className='w-3/5 mx-5 p-14 mb-5'>{/*Sign up Field */}
        <h2 className="mt-6 text-2xl text-gray-900">Sign up to Reveal.me</h2>
        <p className="mt-2 text-sm text-gray-600">Already have an account?{' '}
          <a href="http://localhost:3000/login" className="font-medium text-darker-pink hover:text-indigo-500">
            Login
          </a>
        </p>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fName">
                First Name
              </label>
              <input
                id="first-name"
                name="fName"
                type="fName"
                autoComplete="fName"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setfirstname(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-2xl shadow-sm -space-y-px">
            <div>
              <label htmlFor="lName">
                Last Name
              </label>
              <input
                id="last-name"
                name="lName"
                type="lName"
                autoComplete="lName"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setlastname(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-2xl shadow-sm -space-y-px">
            <div>
              <label htmlFor="email">
                Email
              </label>
              <input
                id="email-address1"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-2xl shadow-sm -space-y-px">
            <div>
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className="group relative w-fit flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create an Account
            </button>
            <p>{error}</p>
          </div>
        </form>
      </div> 
    </div>
    </main>
    </div>
  )
}

export default RegisterPage