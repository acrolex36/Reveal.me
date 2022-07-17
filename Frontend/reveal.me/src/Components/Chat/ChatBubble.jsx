import React from "react";
import { useCookies } from "react-cookie";
const ChatBubble = ({ msg, userData, image }) => {
  const [cookies] = useCookies(null);
  const id = cookies.UserId;
  const token = cookies.token;

  return (
    <div>
      {msg && userData && msg.message ? (
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
                  <span id={msg._id}
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
                  : image
              } `}
              alt="My profile"
              className={`w-6 h-6 rounded-full ${
                msg.sender === id ? "order-2" : "order-1"
              }`}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ChatBubble;
