import React, {useState, useEffect} from 'react'
import {Cookies, useCookies} from "react-cookie";
import { useParams } from 'react-router-dom';
import axios from "axios";
// import {format} from "timeago.js"
const Chat = (props) => {
   const {
      messages,
      currentChat
   } = props
   const [cookies, setCookie, removeCookie] = useCookies(null);
   const token = cookies.Token;
   const id = cookies.UserId;
   const [accountData, setAccountData] = useState([])
   const [userData, setUserData] = useState([])
   const [oneUserMessages, setUsersMessages] = useState([])
   const [newMessages, setMessages] = useState()
   const [loadingMatch, setLoadingMatch] = useState(false)
   const [loadingUser, setLoadingUser] = useState(false)
   const [loadingMessage, setLoadingMessage] = useState(false)
   const [loading, setLoading] = useState(false)
   const [sent, setSent] = useState(false)

   const getMatchAccount = async (matchId) => {
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
      const dataMatch = response.data;
      setAccountData(dataMatch);
      if(accountData.length>0 && accountData.userDetail){
        setLoadingMatch(false)
      }
      else
        setLoadingMatch(true)

    } catch (err) {
      console.error(err.message);
    }
  };

  const getUserAccount = async () => {
      const response = await axios.get(
         `http://localhost:5000/api/test/singleuser/id/${id}`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const dataUser = response.data;
      setUserData(dataUser);
      if(userData.length>0 && userData.userDetail){
         setLoadingUser(false)
      }
      else
        setLoadingUser(true)
  }

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
      const data = response.data
      setUsersMessages(data)
      const newMessage = oneUserMessages.messages
      setMessages(newMessage)
   } catch (error) {
      
   }
  }

   useEffect(()=>{
   const matchId = currentChat?.members?.find(m=>m !== id)
   getMatchAccount(matchId)
   getUserAccount()
   
    if((accountData.length>0 && accountData.userDetail.profile_picture) && (userData.length>0 && userData.userDetail.profile_picture) && (messages))
      setLoading(false)
   else
      setLoading(true)
  }, [props, loading, loadingMessage, sent])
  

   
  return (
<>
   {/* {accountData && accountData.userDetail && <div class="flex sm:items-center justify-between pb-2 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
         <div className="relative">
            <span className="absolute text-green-500 right-0 bottom-0">
               <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
               </svg>
            </span>
         <img src={accountData.userDetail.profile_picture} alt="" class="w-10 sm:w-10 h-10 sm:h-10 rounded-full"/>
         </div>
         <div className="flex flex-col leading-tight">
            <div className="text-lg mt-1 flex items-center">
               <span className="text-gray-700 mr-3">{`${accountData.first_name} ${accountData.last_name}`}</span>
            </div>
            <span className="text-md text-gray-600">{`${accountData.userDetail.occupation}`}</span>
         </div>
      </div>
   </div>} */}
   {/* <div id="messages" className="flex flex-col space-y-3 p-4 overflow-y-auto scrollbar-thumb-blue scrollbar-w-2 scrolling-touch h-[648px] max-h-[1200px]"> */}
      {/* {messages && messages.map((msg, index) =>{
         
         return <div key={index}class="chat-message">
            
               <div className={`flex items-end ${msg.sender === id ? 'justify-end' : ' '}` }>
            <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${msg.sender === id ? 'order-1 item-end' : 'order-2 item-start'}`}>
               <div><span class={` 
               ${msg.sender === id ? 'px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-gray-600' : 'px-4 py-2 rounded-lg inline-block rounded-bl-none bg-pink-100 text-white'}`}>{msg.message}</span>
            </div>
            </div>
            <img src={`${msg.sender === id ? userData.userDetail.profile_picture : accountData.userDetail.profile_picture} `} alt="My profile" className={`w-6 h-6 rounded-full ${msg.sender === id ? "order-2" : "order-1"}`}/>
         </div>
      </div>
      })} */}
      {messages && messages.map((msg, index) =>{
         
         return <div key={index}class="chat-message">
      
      <div className={`flex items-end ${msg.sender === id ? 'justify-end' : ' '}` }>
            <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${msg.sender === id ? 'order-1 item-end' : 'order-2 item-start'}`}>
               <div><span class={` 
               ${msg.sender === id ? 'px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-gray-600' : 'px-4 py-2 rounded-lg inline-block rounded-bl-none bg-pink-100 text-white'}`}>{msg.message}</span>
            </div>
            </div>
            <img src={`${msg.sender === id ? userData?.userDetail?.profile_picture : accountData?.userDetail?.profile_picture} `} alt="My profile" className={`w-6 h-6 rounded-full ${msg.sender === id ? "order-2" : "order-1"}`}/>
         </div>
         </div>})}
   {/* </div> */}
   
</>
  )
}

export default Chat