import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoLogin from "../images/login.png";
import { useCookies } from "react-cookie";
import { loginUser } from "../utils/ApiActions";
import Logo from "../images/Logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [plainTextPassword, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(null);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Data for user login
    let userData = {
      email,
      plainTextPassword,
    };
    try {
      await loginUser(userData)
        .then(function (response) {
          if (response.status == 201) {
            //setting cookies for further use in app
            setCookie("UserId", response.data.userId);
            setCookie("Token", response.data.token);

            //directed to homepage with its userdetail
            navigate("/homepage");
          }
        })
        .catch(function (res) {
          //if unsuccessful then redirected to login and show error
          if (res.response.status == 400) {
            navigate("/login");
            setError('Invalid username or password"');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-20 bg-pink-100">
      <div className="w-full bg-pink-50 rounded-2xl shadow-2xl flex w-5/6 max-w-4xl">
        <div className="w-2/5">
          {/*Sign in Logo */}
          <div className="px-12 py-8 mb-10">
            <img className="w-24 my-3 mr-0" src={Logo} alt="Logo" />
            <p className="mt-6 text-2xl text-gray-900 font-mono font-bold text-2xl">
              Reveal.me
            </p>
            <p>reveal you, reveal us!</p>
          </div>
          <img src={LogoLogin} alt="" className="w-50 ml-4 mb-8" />
        </div>
        <div className="w-3/5 p-14 mx-5 mb-5">
          {/*Sign in Field */}
          <h2 className="mt-6 text-2xl text-gray-900">
            Sign in to{""}
            <a
              className="my-auto btn btn-ghost normal-case font-mono text-2xl"
              href="/"
            >
              Reveal.me
            </a>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            No Account yet?{" "}
            <a
              href="http://localhost:3000/register"
              className="font-medium text-darker-pink hover:text-pink-100"
            >
              Register
            </a>
          </p>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address">Email address</label>
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
                <label htmlFor="password">Password</label>
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

            <div className="flex flex-col justify-center">
              <div className="flex justify-center mt-8 mb-2">
                <button
                  type="submit"
                  className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
              <div className="text-center text-sm">
                <a
                  href="http://localhost:3000/login/forgot_password"
                  className="font-medium text-indigo-600 hover:text-darker-pink"
                >
                  Forgot your password?
                </a>
                <p>{error}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
