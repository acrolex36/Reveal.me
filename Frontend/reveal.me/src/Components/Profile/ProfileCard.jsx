const ProfileCard = ({person}) => {
    return (
        <div class="min-w-max max-w-xl card lg:card-side cursor-pointer border-black bg-pink-0">
            <figure className="m-auto mr-3 rounded-lg">
                <img
                    className="rounded-lg blur"
                    src={person.profile_picture}
                    alt="profile picture"
                />
            </figure>

            <div class="max-w-md justify-between p-4 leading-normal">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {person.name}, {person.age}
                    </h1>
                    <h2 class="text-2xl tracking-tight text-gray-900 dark:text-white">
                        {person.education}
                    </h2>
                </div>
                <section>
                    <ul role="list" class="mt-2 space-y-3">
                        <li class="flex space-x-3">
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                                fill="pink"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Darmstadt
              </span>
                        </li>
                        <li class="flex space-x-3">
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                                fill="pink"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {person.height} cm
              </span>
                        </li>
                        <li class="flex space-x-3">
                            <svg
                                class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                                fill="pink"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {person.language[0]},{person.language[1]}
              </span>
                        </li>
                    </ul>
                    <p class="whitespace-normal my-5 text-gray-700 dark:text-gray-400">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ProfileCard;
