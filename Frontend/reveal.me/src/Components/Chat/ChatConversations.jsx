import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const ChatConversations = (props) => {
  const { conversation, currentUser } = props;
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(null);
  const [image, setImage] = useState('')
  const token = cookies.Token;
  useEffect(() => {
    const matchId = conversation.members.find((m) => m !== currentUser);
    
    const getImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/conversation/user/picture/${conversation._id}/${currentUser}`,
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setImage(data);
        
      } catch (err) {
        console.error(err.message);
      }
    };
    const getUser = async (matchId) => {
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
      } catch (err) {
        console.error(err.message);
      }
    };
      
    getImage();
    getUser(matchId);
  }, [props]);

  return (
    <div>
      { image && user && user?.userDetail ? (
        <div
          key={user._id}
          className="flex items-center px-3 py-2 my-3 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
        >
          <img
            className={`object-cover w-10 h-10 rounded-full`}
            src={image}
            alt="userpic"
          />
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-4 text-s font-semibold text-gray-600">{`${user.first_name} ${user.last_name}`}</span>
            </div>
          </div>
        </div>
      ): (<div>fetching...</div>)}
    </div>
  );
};

export default ChatConversations;