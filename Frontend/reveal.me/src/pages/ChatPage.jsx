import React from 'react'
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import ChatContainer from '../Components/ChatContainer';
const ChatPage = () => {
  return (
    <div className='overflow-y-none'>
        <div className="flex flex-col h-full overflow-y-none bg-pink">
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
    </div>
  )
}

export default ChatPage