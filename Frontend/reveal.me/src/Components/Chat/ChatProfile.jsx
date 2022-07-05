import React from 'react'

const ChatProfile = (props) => {
    const {
      accountData,
   } = props

  return (           
    <div class="card w-full bg-base-100 shadow-xl h-full">
        <figure><img src={accountData?.userDetail?.profile_picture === "" ? "https://api.lorem.space/image/face?w=150&h=150" : accountData?.userDetail?.profile_picture} alt="profile picture" className='w-96 blur'/></figure>
        <div class="card-body">
        <h1 class="card-title">{`${accountData.first_name} ${accountData.last_name}, ${accountData.userDetail.age}`}</h1>
        <h2 className='mb-[30px]'>{`${accountData.userDetail.occupation}`}</h2>
        <p>{`${accountData.userDetail.description}`}</p>
        </div>
    </div>
  )
}

export default ChatProfile