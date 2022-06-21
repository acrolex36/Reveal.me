import React from 'react'
import Nationality from "./Nationality"
import Language from "./Language"
import ReactLanguageSelect from 'react-languages-select';
import 'react-languages-select/css/react-languages-select.css';
const ProfileFields = () => {
  return (
    <div className='shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-gray-50 space-y-6 sm:p-6 my-5'>
          <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 py-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Picture</h3>
              <p className="mt-1 text-sm text-gray-600">
                This Picture will be blurred/pixelized until you've reached the max amount of chats with a person!
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-gray-0 space-y-6 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
              <p className="mt-1 text-sm text-gray-600"></p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-gray-0 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        autoComplete="confirm-password"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <button
                      type='button'
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-100 hover:bg-darker-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Set Location
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Details</h3>
              <p className="mt-1 text-sm text-gray-600">Give us these little details about you!</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-gray-0 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        autoComplete="gender"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Diverse</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                        Height
                      </label>
                      <input
                        type="text"
                        name="height"
                        id="height"
                        autoComplete="height"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-28 h-8 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>

                     <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                        Nationality
                      </label>
                      <Nationality></Nationality>
                    </div>

                    <div className="col-span-6 sm:col-span-3 menu-languages">
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <Language></Language>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                        Education
                      </label>
                      <input
                        type="text"
                        name="education"
                        id="education"
                        autoComplete="education"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>

                    
                  </div>
                </div>
              </div>            
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileFields