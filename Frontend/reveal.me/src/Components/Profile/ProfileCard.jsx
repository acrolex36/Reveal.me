const ProfileCard = ({person}) => {
    const details = person.userDetail;
    const languages = details.languages.join(", ");
    const renderDetail = (detail, extraText) => {
        return (<li className="flex space-x-3">
            <svg
                className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="pink"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            {`${detail} ${extraText ? extraText : ""}`}
            </span>
        </li>)
    };

    return (
        <div className="card width-card lg:card-side cursor-pointer border-black bg-pink-0">
            <figure className="w-[400px] rounded-lg">
                <img
                    className="w-full blur"
                    src={details.profile_picture}
                    alt="profile picture"
                />
            </figure>

            <div className="max-w-md justify-between my-3 mx-5 p-4 leading-normal">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {person.first_name}, {person.userDetail.age}
                    </h1>
                    <h2 className="text-xl tracking-tight text-gray-900 dark:text-white">
                        {person.userDetail.occupation}
                    </h2>
                </div>
                <section className="mt-3">
                    <ul role="list" className=" space-y-3">
                        {details.nationality ? renderDetail(details.nationality) : null}
                        {details.height ? renderDetail(details.height, "cm") : null}
                        {details.languages ? renderDetail(languages) : null}
                    </ul>
                    <p className="whitespace-normal my-5 text-gray-700 dark:text-gray-400">
                        {details.description ? details.description : null}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ProfileCard;
