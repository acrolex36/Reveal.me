const ProfileCard = ({ person }) => {
  return (
    <div className="card width-card  lg:card-side cursor-pointer border-black bg-pink-0">
      <figure className="ml-10 rounded-lg">
        <img
          className="w-2/4 rounded-lg blur"
          src={person.userDetail.profile_picture}
          alt="profile picture"
        />
      </figure>

      <div className="max-w-md justify-between p-4 leading-normal">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {person.first_name}, {person.userDetail.age}
          </h1>
          <h2 className="text-2xl tracking-tight text-gray-900 dark:text-white">
            {person.userDetail.occupation}
          </h2>
        </div>
        <section>
          <ul role="list" className="mt-2 space-y-3"></ul>
          <p className="whitespace-normal my-5 text-gray-700 dark:text-gray-400"></p>
        </section>
      </div>
    </div>
  );
};

export default ProfileCard;
