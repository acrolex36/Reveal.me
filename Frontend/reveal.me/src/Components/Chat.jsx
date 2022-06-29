import React, {useState, useEffect} from 'react'
import {Cookies, useCookies} from "react-cookie";
import { useParams } from 'react-router-dom';
import axios from "axios";
const Chat = ({matchId, usersMessages}) => {

   const [cookies, setCookie, removeCookie] = useCookies(null);
   const token = cookies.Token;
   const { _id } = useParams();
   const id = cookies.UserId;
   const [accountData, setAccountData] = useState([])

   const getAccount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/test/singleuser/id/${matchId}`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data)
      setAccountData(response.data);
      console.log(accountData)
      console.log(usersMessages)
      // console.log(accountData.first_name)
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUserMessages = async ()=> {
   try {
      const response = await axios.get(
         `http://localhost:5000/api/oneconversation/${id}/${matchId}`,
         {
            headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
         }
      );
      console.log(response.data)
      setUsersMessages(response.data)
      console.log(usersMessages.messages)
   } catch (error) {
      
   }
  }

//   const getClickedUsersMessages = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/oneconversation/${matchId}/${id}`, {  
//             headers: {
//             "Content-Type": "application/json; charset=UTF-8",
//             Authorization: `Bearer ${token}`,
//           },
//             })
//             console.log(response.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

   useEffect(()=>{
    getAccount()
  }, [usersMessages])

   const [textArea, setTextArea] = useState()
  return (

    <div class="flex-1 p:2 sm:p-4 justify-between flex flex-col h-4/5">
   <div class="flex sm:items-center justify-between pb-2 border-b-2 border-gray-200">
      <div class="relative flex items-center space-x-4">
         <div class="relative">
            <span class="absolute text-green-500 right-0 bottom-0">
               <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
               </svg>
            </span>
         <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" class="w-10 sm:w-10 h-10 sm:h-10 rounded-full"/>
         </div>
         <div class="flex flex-col leading-tight">
            <div class="text-lg mt-1 flex items-center">
               <span class="text-gray-700 mr-3">{`${accountData.first_name} ${accountData.last_name}`}</span>
            </div>
            {/* <span class="text-md text-gray-600">{`${accountData.userDetail.occupation}`}</span> */}
         </div>
      </div>
   </div>
   <div id="messages" class="flex flex-col space-y-3 p-4 overflow-y-auto scrollbar-thumb-blue scrollbar-w-2 scrolling-touch h-[648px] max-h-[1200px]">
      {/* {usersMessages.messages.map(({message, sender, timestamp}) =>{
         <div key={timestamp}class="chat-message">
         <div >
            <div >
               <div><span >{sender}</span>
               </div>
            </div>
            <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1"/>
         </div>
      </div>
      })} */}
   </div>
   <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
         <input type="text" value={textArea} placeholder="Write your message!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3" onChange={(e)=>setTextArea(e.target.value)}/>
         <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
               </svg>
            </button>
            <button type="button" class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
               <span class="font-bold">Send</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>
         </div>
      </div>
   </div>
</div>
  )
}

export default Chat