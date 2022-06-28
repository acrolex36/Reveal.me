import React, {useEffect, useState} from 'react';
import Chat from "./Chat";
import axios from "axios";
import {Cookies, useCookies} from "react-cookie";
const ChatContainer = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const[allConversation, setConversation] = useState([]);
    const [allMessages, setAllMessages] = useState({
    time: "",
    members: [],
    messages: {
      gender: "",
      dob_date: "",
      dob_month: "",
      dob_year: "",
      occupation: "",
      gender_interest: [],
      height: "",
      interest: [],
      language: [],
      nationality: "",
      description: "",
    },
  });

  const getUserMessages = async () => {
    try {
      const id = cookies.UserId;
      const token = cookies.Token;
      const response = await axios
      .get(`http://localhost:5000/api/allconversation/${id}`,{
        headers:{
          "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
      });
      setConversation((allConversation)=>[...allConversation, ...response.data]);
      console.log(allConversation)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserMessages();
  }, [])

  return (
        <div class="w-full mx-auto">
      <div class="border rounded lg:grid lg:grid-cols-4 w-full h-4/5">
        <div class="border-r border-gray-300 lg:col-span-1 lg:block">
          <div class="mx-3 my-3">
            <div class="relative text-gray-600">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" class="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                placeholder="Search" required />
            </div>
          </div>

          <ul class="overflow-auto h-[32rem]">
            <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Messages</h2>
            <li>
              <a
                class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <img class="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600">Jhon Don</span>
                    <span class="block ml-2 text-sm text-gray-600">25 minutes</span>
                  </div>
                  <span class="block ml-2 text-sm text-gray-600">bye</span>
                </div>
              </a>
              <a
                class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100 border-b border-gray-300 cursor-pointer focus:outline-none">
                <img class="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png" alt="username" />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600">Same</span>
                    <span class="block ml-2 text-sm text-gray-600">50 minutes</span>
                  </div>
                  <span class="block ml-2 text-sm text-gray-600">Good night</span>
                </div>
              </a>
              <a
                class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <img class="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600">Emma</span>
                    <span class="block ml-2 text-sm text-gray-600">6 hour</span>
                  </div>
                  <span class="block ml-2 text-sm text-gray-600">Good Morning</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="hidden lg:col-span-2 lg:block">
          <div class="w-full max-h-4/5">
            <Chat></Chat>
          </div>
        </div>
          {/* <div class="hidden lg:col-span-1 lg:block w-full">
          <div class="h-full">
            <div class="card w-full bg-base-100 shadow-xl h-full">
              <figure><img src="https://api.lorem.space/image/face?w=150&h=150" alt="profile picture" className='w-full'/></figure>
              <div class="card-body">
                <h1 class="card-title">{`${accountData.first_name} ${accountData.last_name}Name`}</h1>
                <h2 className='mb-[30px]'>{`${accountData.userDetail.occupation}test`}</h2>
                <p>{`${accountData.userDetail.description}description`}</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ChatContainer