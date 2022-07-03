import React, {useEffect, useState} from 'react';
import Chat from "./Chat";
import axios from "axios";
import {Cookies, useCookies} from "react-cookie";
import ChatProfile from './ChatProfile';
const ChatContainer = () => {
  const [ clickedUser, setClickedUser ] = useState(null)
  const [matchId, setIdMatch] = useState(null)
  const[allConversation, setConversation] = useState([]);
  const [listOfContactDetails, setListOfContactDetail] = useState([]);
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [accountData, setAccountData] = useState([])
  const [loadingMatch, setLoadingMatch] = useState(false)
  const id = cookies.UserId;
  const token = cookies.Token;

  const setChat = (_id) =>{
    setClickedUser(true);
    setIdMatch(_id)
    getMatchAccount(_id)
  }
    
  const getUserConversation = async () => {
    try {
      
      const response = await fetch(`http://localhost:5000/api/allconversation/${id}`,{
        headers:{
          "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setConversation(data)
      if(allConversation.length >0)
      setLoading(false)
      else
      setLoading(true)
    } catch (error) {
        console.log(error)
    }
  }

  const getInfoUser = async ()=>{
    try {
      const id = cookies.UserId;
      const token = cookies.Token;
      let listSenderId = [];
      for( let userCounter = 0;userCounter<allConversation.length; userCounter++){
          if(allConversation.at(userCounter).members.at(0) != id){
            listSenderId.push(allConversation.at(userCounter).members.at(0));
          }
          else {
            listSenderId.push(allConversation.at(userCounter).members.at(1));
          }
      }
      let list = [];
      for(let i = 0; i<listSenderId.length; i++){
        const response = await axios.get(
          `http://localhost:5000/api/test/singleuser/id/${listSenderId.at(i)}`,
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        list.push(response.data);
      }
      setListOfContactDetail(list)
      
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

  useEffect(()=>{
    if(cookies){
      // setInterval(()=>{
        getUserConversation()
        getInfoUser()
      // }, 3000);
    }
  }, [loading, matchId, accountData, clickedUser, loadingMatch])

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
              {listOfContactDetails.length>0 && allConversation.length>0 ? listOfContactDetails.map(({_id, userDetail, first_name, last_name}) =>(
              
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
              )) : <div>Fetching Messages...</div>}
              
            </li>
          </ul>
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full max-h-4/5">
            {clickedUser && matchId && <Chat
             matchId={matchId}
             >
              </Chat>}
          </div>
        </div>
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