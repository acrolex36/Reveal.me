import React from "react";

const ChatProfile = (props) => {
  const { accountData, image } = props;

  return (
    <div className="card w-full bg-base-100 border h-full">
      <figure>
        <img
          src={
            accountData?.userDetail?.profile_picture === ""
              ? "https://api.lorem.space/image/face?w=150&h=150"
              : image
          }
          alt="profile picture"
          className={`w-96 mt-5`}
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title text-3xl">{`${accountData.first_name} ${accountData.last_name}, ${accountData.userDetail.age}`}</h1>
        <h2 className="mb-[30px] text-xl">{`${accountData.userDetail.occupation}`}</h2>
        <p>{`${accountData.userDetail.description}`}</p>
      </div>
    </div>
  );
};

export default ChatProfile;
