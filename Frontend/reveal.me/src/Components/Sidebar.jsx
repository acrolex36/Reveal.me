import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import logoutButton from "../images/logout_button.png";

const Sidebar = () => {
  const [cookies, setCookie] = useCookies(null);
  const [accountData, setAccountData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    userDetail: {
      profile_picture: "",
      occupation: "",
    },
  });
  const getAccount = async (cookies) => {
    try {
      // const email = cookies.Email;
      const id = cookies.UserId;
      const token = cookies.Token;
      const response = await axios.get(
        `http://localhost:5000/api/singleuser/id/${id}`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setAccountData(response.data);
      console.log(accountData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = () => {
    setCookie("UserId", "");
    setCookie("Token", "");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (cookies) {
      getAccount(cookies);
    }
  }, [cookies]);

  return (
    <aside className="w-64 bg-pink-0 ml-3 rounded-2xl h-full ">
      <div className="flex items-center p-4 dark:bg-gray-800">
        <ul className="space-y-2">
          <li className="mt-7 mb-3">
            <div className=" space-x-4">
              <section className={"flex flex-col items-center space-y-1.5"}>
                <img
                  className="w-1/2 rounded-full"
                  src={accountData?.userDetail?.profile_picture}
                  alt="profile picture"
                />
                <div className=" font-medium dark:text-white">
                  <div>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      {`${accountData?.first_name} ${accountData?.last_name}`}
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {accountData?.userDetail?.occupation}
                  </div>
                </div>
              </section>
            </div>
          </li>
          <li>
            <a
              href="/create_profile"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-3">My Profile</span>
            </a>
          </li>
          <li>
            <a
              href="/messages"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
              <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200"></span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">
                Explore Users
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
            </a>
          </li>
          <li>
            <a
              onClick={logout}
              className="flex items-center py-2 pl-3 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <img src={logoutButton} alt="" className="h-6 w-6" />
              <span className="flex-1 ml-2 whitespace-nowrap">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
