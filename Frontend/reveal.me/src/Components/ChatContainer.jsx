import React, {useEffect, useState} from 'react';
import Chat from "./Chat";
import axios from "axios";
import {Cookies, useCookies} from "react-cookie";
import useFetch from "./useFetch"
// const {data: conversations, error, isPending} = useFetch(`http://localhost:5000/api/allconversation/${id}`, token)
// import useFetch from "./useFetch"
const ChatContainer = () => {
  const [ clickedUser, setClickedUser ] = useState(null)
  const [matchId, setIdMatch] = useState()

    const[allConversation, setConversation] = useState([]);
    const [senderDetail, setSenderDetail] = useState([]);
    const [listOfContactDetails, setListOfContactDetail] = useState([]);
    // const [usersMessages, setUsersMessages] = useState(null)
    // const list = []
const [cookies, setCookie, removeCookie] = useCookies(null);
const id = cookies.UserId;
const token = cookies.Token;
// const {data: conversations, error, isPending} = useFetch(`http://localhost:5000/api/allconversation/${id}`, token)
    
    const setChat = (_id) =>{
      setClickedUser(true);
      setIdMatch(_id)
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
      // console.log(response.data)
      // setConversation((allConversation) => [...allConversation, ...response.data]);
      setConversation(data)
      console.log(allConversation)
    } catch (error) {
      console.log(error)
    }
  }

  //   const getUserMessages = async (_id)=> {
  //  try {
  //     const response = await axios.get(
  //        `http://localhost:5000/api/oneconversation/${id}/${_id}`,
  //        {
  //           headers: {
  //           "Content-Type": "application/json; charset=UTF-8",
  //           Authorization: `Bearer ${token}`,
  //         },
  //        }
  //     );
  //     console.log(response.data)
  //     setUsersMessages(response.data)
  //     console.log(usersMessages)
  //  } catch (error) {
      
  //  }
  // }

  const getInfoUser = async ()=>{
    try {
      const id = cookies.UserId;
      const token = cookies.Token;
      console.log(allConversation)
      // console.log(allConversation.length)
      let listSenderId = [];
      for( let userCounter = 0;userCounter<allConversation.length; userCounter++){
        // for(let j = 0; j<allConversation.at(i).members.length; j++){
          if(allConversation.at(userCounter).members.at(0) != id){
            listSenderId.push(allConversation.at(userCounter).members.at(0));
            // break;
          }
          else {
            listSenderId.push(allConversation.at(userCounter).members.at(1));
          }
      }
      console.log("listId")
      console.log(listSenderId)
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
        // console.log(listOfContactDetail);
        console.log(list)
      }
      // console.log(list);
      // setListOfContactDetail((listOfContactDetails) => [...listOfContactDetails, ...list]);
      setListOfContactDetail(list)
      console.log(listOfContactDetails);
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    if(cookies){
      // setConversation([])
    getUserConversation()
    getInfoUser()
    }
  }, [cookies])

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
              {listOfContactDetails && listOfContactDetails.map(({_id, userDetail, first_name, last_name}) =>(
              
                <a key={_id} onClick={()=>setChat(_id)}
                  class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                      <img class="object-cover w-10 h-10 rounded-full"
                    src={userDetail.profile_picture} alt="userpic" />
                  
                  <div class="w-full pb-2">
                     <div class="flex justify-between">
                      <span class="block ml-2 font-semibold text-gray-600">{`${first_name} ${last_name}`}</span>
                    </div>
                  </div>
                </a>
              ))}
              
            </li>
          </ul>
        </div>
        <div class="hidden lg:col-span-2 lg:block">
          <div class="w-full max-h-4/5">
            {clickedUser && <Chat
             matchId={matchId}
             >
              </Chat>}
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