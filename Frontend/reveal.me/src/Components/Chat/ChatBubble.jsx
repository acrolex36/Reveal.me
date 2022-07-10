import React from "react";
import { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
const ChatBubble = ({ msg, userData, accountData, totalMessage }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const id = cookies.UserId;
  const token = cookies.token;

  return (
    <div>
      <div className="chat-message">
        <div
          className={`flex items-end ${
            msg.sender === id ? "justify-end" : " "
          }`}
        >
          <div
            className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
              msg.sender === id ? "order-1 item-end" : "order-2 item-start"
            }`}
          >
            <div>
              {msg.message.length < 200 ? (
                <span
                  className={` 
                        ${
                          msg.sender === id
                            ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-gray-600"
                            : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-pink-100 text-white"
                        }`}
                >
                  {msg.message}
                </span>
              ) : (
                <img
                  src={msg.message}
                  className={` 
                        ${
                          msg.sender === id
                            ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-gray-600"
                            : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-pink-100 text-white"
                        }`}
                ></img>
              )}
            </div>
          </div>
          <img
            src={`${
              msg.sender === id
                ? userData?.userDetail?.profile_picture
                : accountData?.userDetail?.profile_picture
            } `}
            alt="My profile"
            className={`w-6 h-6 rounded-full ${
              msg.sender === id ? "order-2" : "order-1"
            } ${
              totalMessage.at(0) >= 5 && totalMessage.at(1) >= 5 ? "" : "blur"
            } `}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
