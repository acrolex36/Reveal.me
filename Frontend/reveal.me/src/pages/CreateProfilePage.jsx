import React from 'react'
import Header from "../Components/Header";
import ProfileFields from "../Components/Profile/ProfileFields";
import Sidebar from "../Components/Sidebar";
const ProfilePage = () => {
  return (
    <>
        <div className="flex flex-col h-screen bg-pink">
        <div>
          <Header></Header>
        </div>

        <div className="flex flex-1">
          <aside className="hidden sm:block">
            <Sidebar></Sidebar>
          </aside>
          <main class="flex flex-col px-4 w-1500">
            <ProfileFields></ProfileFields>
          </main>
        </div>
      </div>
    </>
  )
}

export default ProfilePage