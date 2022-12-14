import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoForgotPassword from "../images/forgot_password.png";
import { forgotPassword } from "../utils/ApiActions";
import Logo from "../images/Logo.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState(null);
  const [newPlainPassword, setPassword] = useState(null);
  const [confirmNewPlainPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //check if new password and confirm new password match
      if (newPlainPassword !== confirmNewPlainPassword) {
        setError("Passwords need to match!");
        return;
      }

      let userData = { email, newPlainPassword, confirmNewPlainPassword };
      await forgotPassword(userData)
        .then(function (response) {
          if (response.status == 201) {
            alert("Password successfully changed!");
            navigate("/login");
          }
        })
        .catch(function (res) {
          navigate("/login/forgot_password");
          if (res.response.status == 400) {
            setError("Email is not exist");
          }
          if (res.response.status == 409) {
            setError("Password too short min 6 char");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-pink-100 flex flex-col justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        <div className="bg-pink-50 rounded-2xl shadow-2xl flex w-5/6 max-w-4xl">
          <div className="w-2/5">
            {/*Forgot Password Logo */}
            <div className="p-12">
              <img className="w-24 my-3 mr-0" src={Logo} alt="Logo" />
              <p className="mt-6 text-2xl text-gray-900 font-mono font-bold text-2xl">
                Reveal.me
              </p>
              <p>reveal you, reveal us!</p>
            </div>
            <img src={LogoForgotPassword} alt="" className="w-15" />
          </div>
          <div className="w-3/5 mx-5 p-14 mb-5">
            {/*Forgot Password Field */}
            <h2 className="mt-6 text-2xl text-gray-900">Forgot Password?</h2>
            <p className="mt-2 text-sm text-gray-600">
              Set a new password for your reveal.me account
            </p>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-2xl shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email-address"
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
                  <label htmlFor="new password">New Password</label>
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex justify-center mt-8 mb-2">
                  <button
                    type="submit"
                    className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reset Password
                  </button>
                </div>
                <div className="text-center text-sm">
                  <a
                    href="http://localhost:3000/login"
                    className="font-medium text-indigo-600 hover:text-darker-pink"
                  >
                    Back to Sign in
                  </a>
                  <p>{error}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
