import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Nationality from "./Nationality"
import Language from "./Language"
import Hobbies from "./Hobbies"

const ProfileFields = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate(); 
  const routeChange = (newPath) =>{ 
    let path = newPath; 
    navigate(path);
  }
  

  const changePicture = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2){
        setSelectedFile(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };

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
                <div className="py-3 center mx-auto">
                  <div class="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
                    <div className='mb-4'>
                      <img src={selectedFile}/>
                    </div>
                    <label class="cursor-pointer mt-6">
                      <span class="mt-2 text-base leading-normal px-4 py-2 bg-pink-100 text-white text-sm rounded-full" htmlFor="image-upload" >Select Profile Picture</span>
                      <input type='file' multiple={false} accept="image/*" name='image-upload' id='image-upload' onChange={changePicture} class="hidden"/>
                    </label>
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

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-darker-pink">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block xl:w-96 w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="password" className="block text-sm font-medium text-darker-pink">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="mt-1 focus:outline-none bg-gray-100 focus:ring focus:ring-darker-pink block w-full xl:w-96 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                        disabled="true"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-darker-pink">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        autoComplete="confirm-password"
                        className="mt-1 focus:outline-none bg-gray-100 focus:ring focus:ring-darker-pink block w-full xl:w-96 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                        disabled="true"
                      />
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
                      <label htmlFor="first-name" className="block text-sm font-medium text-darker-pink">
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
                      <label htmlFor="last-name" className="block text-sm font-medium text-darker-pink">
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

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="location" className="block text-sm font-medium text-darker-pink">
                        Location
                      </label>
                      <button
                      type='button'
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-100 hover:bg-darker-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Set Location
                      </button>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="" className="block text-sm font-medium text-darker-pink">
                        Date of Birth
                      </label>
                      <input type="date" onChange={e=>setSelectedDate(date)} className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block h-8 w-32 px-1 shadow-sm sm:text-sm border border-pink-100 rounded-md"/>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium text-darker-pink">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        autoComplete="gender"
                        className="mt-1 block w-full py-2 px-3 border border-pink-100 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Diverse</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="height" className="block text-sm font-medium text-darker-pink">
                        Height (in cm)
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
                      <label htmlFor="nationality" className="block text-sm font-medium text-darker-pink">
                        Nationality
                      </label>
                      <Nationality></Nationality>
                    </div>

                    <div className="col-span-6 sm:col-span-3 menu-languages">
                      <label htmlFor="language" className="block text-sm font-medium text-darker-pink">
                        Language
                      </label>
                      <Language></Language>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="education" className="block text-sm font-medium text-darker-pink">
                        Education
                      </label>
                      <input
                        type="text"
                        name="education"
                        id="education"
                        autoComplete="education"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full xl:w-96 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>
                      <div className="col-span-6 checkbox-hobby">
                      <label htmlFor="language" className="block text-sm font-medium text-darker-pink">
                        Hobby
                      </label>
                      <Hobbies></Hobbies>
                    </div>                    

                    <div className="col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-darker-pink">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        autoComplete="description"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full h-28 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div> 
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    className="inline-flex justify-center py-2 px-4 mr-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-100 hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={()=>routeChange("/register")}>
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>       
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileFields