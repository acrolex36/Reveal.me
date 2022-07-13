import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import ChatContainer from "../Components/Chat/ChatContainer";
const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-y-none bg-pink-50">
      <div>
        <Header></Header>
      </div>

      <div className="flex flex-1 h-4/5">
        <aside className="hidden sm:block">
          <Sidebar></Sidebar>
        </aside>
        <div class="px-4 w-full h-4/5">
          <ChatContainer></ChatContainer>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
