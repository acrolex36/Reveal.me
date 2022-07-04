import React, {useEffect, useState} from 'react';
import Chat from "./Chat";
import axios from "axios";
import {Cookies, useCookies} from "react-cookie";
import ChatProfile from './ChatProfile';
import ChatConversations from './ChatConversations';
const ChatContainer = () => {
  const [ clickedUser, setClickedUser ] = useState(null)
  const [matchId, setIdMatch] = useState(null)
  const[allConversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null)
  const [listOfContactDetails, setListOfContactDetail] = useState([]);
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [accountData, setAccountData] = useState([])
  const [loadingMatch, setLoadingMatch] = useState(false)
   const [oneUserMessages, setUsersMessages] = useState(null)
   const [messages, setMessages] = useState([])
  const [textArea, setTextArea] = useState('')
  const id = cookies.UserId;
  const token = cookies.Token;

  const setChat = (_id) =>{
    setClickedUser(true);
    setIdMatch(_id)
    getMatchAccount(_id)
  }
    
  const getUserConversation = async () => {
    try {
      
      const response = await axios.get(`http://localhost:5000/api/allconversation/${id}`,{
        headers:{
          "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data
      setConversation(data)
      setIdMatch(conversation.members.find(m=>m!==id))
      if(allConversation && allConversation.length >0)
      setLoading(false)
      else
      setLoading(true)
    } catch (error) {
        console.log(error)
    }
  }

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

  const sendMessage = async (e)=>{
    e.preventDefault()
      try {
         const response = await axios
        .put(
          `http://localhost:5000/api/conversation/message/${currentChat?._id}`,
          {
            userId: id,
            message: textArea
          },
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${cookies.Token}`,
            },
          }
        )
        // setSent(true);
        setMessages([...messages, response.data])
        setTextArea('')
      } catch (error) {
         console.log(error);
      }
   }


  useEffect(()=>{
        getUserConversation()
  }, [loading, cookies])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
        `http://localhost:5000/api/oneconversationid/${currentChat?._id}`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
        const data = res.data;
        setMessages(data?.messages);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, messages]);

  console.log(messages)

  return (
        <div className="w-full mx-auto">
      <div className="border rounded lg:grid lg:grid-cols-4 w-full h-4/5">
        <div className="border-r border-gray-300 lg:col-span-1 lg:block">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                placeholder="Search" required />
            </div>
          </div>

          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Messages</h2>
             <li>
              {/* {listOfContactDetails.length>0 && allConversation.length>0 ? listOfContactDetails.map(({_id, userDetail, first_name, last_name}) =>(
              
                <a key={_id} onClick={()=>setChat(_id)}
                  className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                      <img className="object-cover w-10 h-10 rounded-full"
                    src={userDetail.profile_picture} alt="userpic" />
                  
                  <div className="w-full pb-2" onLoad={()=>setLoading(false)}>
                     <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">{`${first_name} ${last_name}`}</span>
                    </div>
                  </div>
                </a>
              )) : <div>Fetching Messages...</div>} */}
              {allConversation && allConversation.length > 0 ? allConversation.map((convo)=>(
                <div onClick={()=>setCurrentChat(convo)}>
                <ChatConversations conversation={convo}
                currentUser={id}
                setChat={setChat}
                onClick={()=>setCurrentChat(convo)}
                ></ChatConversations>
                </div>
              )):<div>Fetching messages...</div>}
            </li>
          </ul>
        </div>
        { currentChat && (<div className="hidden lg:col-span-2 lg:block">
          <div className="w-full max-h-4/5">
            {/* {clickedUser && matchId && <Chat
             matchId={matchId}
             conversation={allConversation}
             >
              </Chat>} */}
              <div id="messages" className="flex flex-col space-y-3 p-4 overflow-y-auto scrollbar-thumb-blue scrollbar-w-2 scrolling-touch h-[648px] max-h-[1200px]">
              {messages && 
                  <Chat 
                  messages={messages}
                  currentChat={currentChat}
                  ></Chat>
            }
              </div>
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
         <input type="text" value={textArea} placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3" onChange={(e)=>setTextArea(e.target.value)}/>
         <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
               </svg>
            </button>
            <button onClick={sendMessage} type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
               <span className="font-bold">Send</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>
         </div>
      </div>
   </div>

        </div>)}
        <div class="hidden lg:col-span-1 lg:block w-full">
          <div class="h-full">
            {clickedUser && accountData && accountData.userDetail && 
            <ChatProfile
              accountData={accountData}
            >
            </ChatProfile>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer