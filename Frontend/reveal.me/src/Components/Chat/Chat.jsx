import React, { useState, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
const Chat = (props) => {
  const { messages, currentChat, totalMessage } = props;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const token = cookies.Token;
  const id = cookies.UserId;
  const [accountData, setAccountData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  // const [totalMessage, setTotalMessage] = useState([])

  const getMatchAccount = async (matchId) => {
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
      setAccountData(dataMatch);
      if (accountData.length > 0 && accountData.userDetail) {
        setLoadingMatch(false);
      } else setLoadingMatch(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUserAccount = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/singleuser/id/${id}`,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const dataUser = response.data;
    setUserData(dataUser);
    if (userData.length > 0 && userData.userDetail) {
      setLoadingUser(false);
    } else setLoadingUser(true);
  };

  //    const checkTotalMessage = async (matchId) =>{
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/message/total/${id}/${matchId}`,{
  //         headers:{
  //           "Content-Type": "application/json; charset=UTF-8",
  //             Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await response.data
  //       setTotalMessage(data)

  //     }
  //     catch(error){
  //       console.log(error);
  //     }
  //   }

  useEffect(() => {
    const matchId = currentChat?.members?.find((m) => m !== id);
    getMatchAccount(matchId);
    getUserAccount();
    // checkTotalMessage(matchId)
    if (
      accountData.length > 0 &&
      accountData.userDetail.profile_picture &&
      userData.length > 0 &&
      userData.userDetail.profile_picture &&
      messages
    )
      setLoading(false);
    else setLoading(true);
  }, [props, loading]);

  return (
    <>
      {totalMessage && accountData && accountData.userDetail && (
        <div class="flex sm:items-center justify-between pb-2 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              {/* <span className="absolute text-green-500 right-0 bottom-0">
               <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
               </svg>
            </span> */}
              <img
                src={accountData.userDetail.profile_picture}
                alt=""
                class={`w-10 sm:w-10 h-10 sm:h-10 rounded-full ${
                  totalMessage.at(0) >= 5 && totalMessage.at(1) >= 5
                    ? ""
                    : "blur"
                }`}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-lg mt-1 flex items-center">
                <span className="text-gray-700 mr-3">{`${accountData.first_name} ${accountData.last_name}`}</span>
              </div>
              <span className="text-md text-gray-600">{`${accountData.userDetail.occupation}`}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
