import React, { useEffect, useState, useRef } from "react";
import Chat from "./Chat";
import { useCookies } from "react-cookie";
import ChatProfile from "./ChatProfile";
import ChatConversations from "./ChatConversations";
import ChatBubble from "./ChatBubble";
import { io } from "socket.io-client";
import {
  getAllConversation,
  getPicture,
  sendMessages,
  getMessagesInConversation,
  getSingleUser,
} from "../../utils/ApiActions";

const ChatContainer = () => {
  const [allConversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [cookies] = useCookies(null);
  const [accountData, setAccountData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [textArea, setTextArea] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const id = cookies.UserId;
  const token = cookies.Token;
  const socket = useRef();
  const [userData, setUserData] = useState([]);
  const [sendImage, setSendImage] = useState("");
  const [image, setImage] = useState("");
  const scrollRef = useRef(null);

  //get blurred/unblurred image from backend
  const getImage = async (currentChat) => {
    try {
      if (currentChat) {
        const response = await getPicture(currentChat?._id, id, token);
        const data = response.data;
        setImage(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //get messages to socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        message: data.text,
        timestamp: Date.now(),
      });
    });
  }, []);

  //set messages from socket.io
  useEffect(() => {
    getImage(currentChat);
    arrivalMessage &&
      image &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //add online user
  useEffect(() => {
    socket.current.emit("addUser", id);
  }, [id]);

  //get all conversation from one user
  const getUserConversation = async () => {
    try {
      const response = await getAllConversation(id, token);
      const data = response;
      setConversation(data);
    } catch (error) {
      console.log(error);
    }
  };

  //send message to other user
  const sendMessage = async (e) => {
    e.preventDefault();
    let sendMessage;
    const receiverId = currentChat.members.find((member) => member !== id);

    //check if sent message is text or image
    if (sendImage === "" && textArea !== "") {
      socket.current.emit("sendMessage", {
        senderId: id,
        receiverId,
        text: textArea,
      });
      sendMessage = textArea;
    } else if (sendImage !== "" && textArea === "") {
      socket.current.emit("sendMessage", {
        senderId: id,
        receiverId,
        text: sendImage,
      });
      sendMessage = sendImage;
    }

    //empty input
    setTextArea("");
    setSendImage("");

    //POST send image
    try {
      const response = await sendMessages(
        currentChat?._id,
        id,
        token,
        sendMessage
      );
      const newMessage = response.data;
      setMessages([...messages, newMessage]);
      getImage(currentChat);
    } catch (error) {
      console.log(error);
    }
  };

  //get messages from one conversation
  const getMessages = async () => {
    try {
      if (currentChat) {
        const res = await getMessagesInConversation(currentChat?._id, token);
        const data = res.data;
        setMessages(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //get current user account
  const getUserAccount = async () => {
    const response = await getSingleUser(id, token);
    const dataUser = response.data;
    setUserData(dataUser);
  };

  //get account from match
  const getMatchAccount = async (matchId) => {
    try {
      if (matchId) {
        const response = await getSingleUser(matchId, token);
        const dataMatch = response.data;
        setAccountData(dataMatch);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //setting image as message
  const setPicture = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSendImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //first load all conversation from current user
  useEffect(() => {
    getUserConversation();
  }, [cookies]);

  //loads when clicking one conversation
  useEffect(() => {
    const matchId = currentChat?.members?.find((m) => m !== id);
    setImage("");
    setAccountData([]);
    setUserData([]);
    setMessages("");
    getImage(currentChat);
    getMatchAccount(matchId);
    getUserAccount();
    getMessages(matchId);
  }, [currentChat]);

  //reloads when image is set
  useEffect(() => {
    const matchId = currentChat?.members?.find((m) => m !== id);
    getMessages(matchId);
    getMatchAccount(matchId);
    getUserAccount();
  }, [image, currentChat]);

  //scroll down to the last message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mt-3 w-full mx-auto bg-pink-0">
      <div className="border rounded-xl lg:grid lg:grid-cols-4 w-full h-4/5">
        <div className="border-r border-gray-300 lg:col-span-1 lg:block">
          <ul className="overflow-auto h-[32rem]">
            <h2 id="titlePage" className="mx-3 my-5 mb-2 ml-2 text-lg text-gray-600">
              Messages
            </h2>
            {/*List of Conversations */}
            {allConversation && allConversation.length > 0 ? (
              allConversation.map((convo, index) => (
                <li id='convoList' key={index} onClick={() => setCurrentChat(convo)}>
                  <ChatConversations
                    conversation={convo}
                    currentUser={id}
                    onClick={() => setCurrentChat(convo)}
                  ></ChatConversations>
                </li>
              ))
            ) : allConversation.length === 0 ? (
              <div className="mx-3 my-5 mb-2 ml-2 text-lg text-gray-300">
                You Have No Conversation Yet
              </div>
            ) : (
              <div>Fetching Conversations...</div>
            )}
          </ul>
        </div>
        {/*Profile Header*/}
        {currentChat && (
          <div className="hidden lg:col-span-2 lg:block">
            <div className="w-full max-h-4/5">
              <div className="flex-1 p:2 sm:p-4 justify-between flex flex-col h-4/5">
                {messages ? (
                  <Chat currentChat={currentChat} image={image}></Chat>
                ) : (
                  <div>Fetching user...</div>
                )}
                <div
                  id="messages"
                  className="position:static flex flex-col space-y-3 p-4 overflow-y-auto scrollbar-thumb-blue scrollbar-w-2 scrolling-touch h-[648px] max-h-[1200px]"
                >
                  {/*Chat Bubble*/}
                  {
                    messages &&
                    userData &&
                    userData?.userDetail &&
                    messages.map((m, index) => (
                      <div key={index} ref={scrollRef}>
                        <ChatBubble
                          msg={m}
                          userData={userData}
                          image={image}
                        ></ChatBubble>
                      </div>
                    ))}
                </div>
                {/*Input Area */}
                <form onSubmit={sendMessage}>
                  <div id="inputArea" className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">
                      {sendImage === "" ? (
                        <input
                          type="text"
                          value={textArea}
                          placeholder="Write your message!"
                          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3 pr-36 max-h-28 box-border overflow-y-hidden scrollbar-thumb-blue scrolling-touch"
                          onChange={(e) => setTextArea(e.target.value)}
                        />
                      ) : (
                        <img
                          src={sendImage}
                          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3 pr-36 h-auto box-border overflow-y-hidden scrollbar-thumb-blue scrolling-touch"
                          onClick={(e) => setSendImage("")}
                        ></img>
                      )}
                      <div id="sendImage" className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <label>
                          <span
                            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                            htmlFor="image-upload"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="h-6 w-6 text-gray-600"
                              htmlFor="image-upload"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                htmlFor="image-upload"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                htmlFor="image-upload"
                              ></path>
                            </svg>
                          </span>
                          <input
                            type="file"
                            multiple={false}
                            accept="image/*"
                            name="image-upload"
                            id="image-upload"
                            onChange={setPicture}
                            className="hidden"
                          />
                        </label>
                        <button
                        id="sendMessage"
                          type="submit"
                          className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                        >
                          <span className="font-bold">Send</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-6 w-6 ml-2 transform rotate-90"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/*Right Side Profile*/}
        <div className="hidden lg:col-span-1 lg:block w-full">
          <div className="h-full">
            {
              currentChat &&
              accountData &&
              accountData.userDetail && (
                <ChatProfile
                  accountData={accountData}
                  image={image}
                ></ChatProfile>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
