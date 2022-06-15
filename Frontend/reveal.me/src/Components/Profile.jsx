const Profile = () => {
  return (
    <div
      href="#"
      class="screen border-black flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div class=" flex flex-col justify-between p-4 leading-normal">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bob Man
          </h1>
          <h2 class=" text-l font-bold tracking-tight text-gray-900 dark:text-white">
            Student at Hochschule Darmstadt
          </h2>
          <h3>
            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              24 Years Old
            </span>
          </h3>
        </div>
        <section>
          <ul role="list" class="mt-2 space-y-3">
            <li class="flex space-x-3">
              <svg
                class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
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
                fill="currentColor"
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
                185 cm
              </span>
            </li>
            <li class="flex space-x-3">
              <svg
                class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
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
                Part Time chef at Vapiano{" "}
              </span>
            </li>
            <li class="flex space-x-3">
              <svg
                class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
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
                20GB Cloud storage
              </span>
            </li>
          </ul>
        </section>

        <p class="my-5 text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order. Here are the biggest enterprise
          technology acquisitions of 2021 so far, in reverse chronological
          order. Here are the biggest enterprise technology acquisitions of 2021
          so far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
};
export default Profile;
