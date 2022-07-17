import React from "react";
import Logo from "../images/Logo.png";

const LandingPage = () => {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen w-full px-20 bg-revealme-pattern h-full bg-cover">
            <div className="w-full bg-[#FFF5F5] rounded-2xl shadow-2xl flex w-5/6 max-w-md">
                <div className="w-full p-14 mx-5 mb-5 flex flex-col items-center text-center">
                    <img src={Logo} alt="" className="w-28"/>
                    <h2 className="mt-6 text-2xl text-gray-900 font-mono font-bold text-2xl">
                        Reveal.me
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Find your soulmate today!
                    </p>

                    {/* Create an account button */}
                    <div className="flex flex-col justify-center">
                        <div className="flex justify-center mb-2 mt-6 space-y-6">
                            <a
                                id="registerButton"
                                    href="/register"
                                className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-100 focus:outline-none"
                            >
                                Create an Account
                            </a>
                        </div>
                        {/* Login Section */}
                        <p className="mt-6 text-sm text-gray-600 font-bold">
                            Already have an account?
                        </p>
                        <div className="flex justify-center mb-2 mt-2">
                            <a
                                id="signInButton"
                                href="/login"
                                className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-100 focus:outline-none"
                            >
                                Sign in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
