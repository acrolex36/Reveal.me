import React, { useState, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { getSingleUser } from "../../utils/ApiActions";
const Chat = (props) => {
  const { currentChat, image } = props;
  const [cookies] = useCookies(null);
  const token = cookies.Token;
  const id = cookies.UserId;
  const [accountData, setAccountData] = useState([]);

  const getMatchAccount = async (matchId) => {
    try {
      const response = await getSingleUser(matchId, token);
      const dataMatch = response.data;
      setAccountData(dataMatch);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const matchId = currentChat?.members?.find((m) => m !== id);
    //get match profile for header chat
    getMatchAccount(matchId);
  }, [props]);

  return (
    <>
      {accountData && accountData.userDetail ? (
        <div className="flex sm:items-center justify-between pb-2 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <img id="topImage"
                src={image}
                alt=""
                className={`w-10 sm:w-10 h-10 sm:h-10 rounded-full`}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-lg mt-1 flex items-center">
                <span id="topName" className="text-gray-700 mr-3">{`${accountData.first_name} ${accountData.last_name}`}</span>
              </div>
              <span id="topDetail" className="text-md text-gray-600">{`${accountData.userDetail.occupation}`}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex sm:items-center justify-between pb-2 border-b-2 border-gray-200">
          Setting Up Header...
        </div>
      )}
    </>
  );
};

export default Chat;
