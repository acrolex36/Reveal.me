import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";
import {Cookies, useCookies} from "react-cookie";

const ChatConversations = (props) => {
    const {conversation, currentUser} = props
    const [user, setUser] = useState(null)
    const [loadingMatch, setLoadingMatch] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const token = cookies.Token;

    useEffect(()=>{
        const matchId = conversation.members.find(m=>m !== currentUser)
        const getUser = async ()=>{
            try {
      const response = await axios.get(
        `http://localhost:5000/api/singleuser/id/${matchId}`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataMatch = response.data;
      setUser(dataMatch);
      if(user && user.length>0 && user.userDetail){
        setLoadingMatch(false)
      }
      else
        setLoadingMatch(true)

    } catch (err) {
      console.error(err.message);
    }
        }
    getUser()
    }, [currentUser, conversation])
  return (
    <div>
        {user && user.userDetail && <div key={user._id}  className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
        <img className="object-cover w-10 h-10 rounded-full"
        src={user.userDetail.profile_picture} alt="userpic" />
        <div className="w-full pb-2" onLoad={()=>setLoading(false)}>
            <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-gray-600">{`${user.first_name} ${user.last_name}`}</span>
        </div>
        </div>
        </div>}

    </div>
  )
}

export default ChatConversations