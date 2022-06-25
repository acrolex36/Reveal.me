import React, {useState} from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Nationality from "./Nationality"
import Language from "./Language"
import Interest from './Interest';
import {hobbies} from "../utils/Hobbies"
import {Genders} from "../utils/Gender"
import {languages} from "../utils/Language"

const ProfileFields = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [accountData, setAccountData] = useState([{
    email:'', password:'', confirmPass:'', first_name:'', last_name:''
  }]);
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [nationality, setNationality] = useState("");
  const [language, setLanguage] = useState([]);
  const [occupation, setOccupation] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [description, setDescription] = useState("");
  const [hobbyList, setHobbies] = useState([]);
  const [genderInterests, setGenderInterests] = useState([]);

  const getAccount = async () =>{
    try{
      const response = await fetch("",{
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      setAccountData(data);
    } catch (err){
      console.error(err.message);
    }
  }
  
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

  const handleOnChangeLanguage = (lang, language) => {
    if(language.includes(lang))
        removeLanguage(lang)
    else{
      const updatedState = [...language];
      updatedState.push(lang);
      setLanguage(updatedState);
      console.log(updatedState);
    }
  }

  const removeLanguage = (id) => {
    const updatedState = language.filter(
      (lang) => lang!==id
    );
    setLanguage(updatedState);
    console.log(updatedState);
  }

  const resetLanguage = () => {
    setLanguage([]);
    console.log(language);
  }

  const handleNationality = nat => {
    setNationality(nat);
  }

  const handleOnChangeHobby = (hobby) => {
    const updatedChecked = [...hobbyList];
    updatedChecked.push(hobby);
    setHobbies(updatedChecked); 
    console.log(updatedChecked);
    }

  const removeHobby = (id)=>{
    const updatedState = hobbyList.filter(
      (hobby) => hobby!==id
    );
    setHobbies(updatedState)
    console.log(updatedState)
  } 

  const removeGender = (id) =>{
    const updatedState = genderInterests.filter(
      (gender) => gender!==id
    );
    setGenderInterests(updatedState)
    console.log(updatedState)
  }

  const handleOnChangeGender = (gender) =>{
    const updatedChecked = [...genderInterests];
    updatedChecked.push(gender);
    setGenderInterests(updatedChecked); 
    console.log(updatedChecked);
  }

  useEffect(()=>{
    getAccount();
  })

  return (
    <div className='flex flex-col justify-center'>
      <form action="#" method="POST">
    <div className='shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-gray-50 space-y-6 sm:p-6 max-w-5xl my-5'>
      
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
                <div className="py-3 center mx-auto">
                  <div class="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-fit">
                    <div className='mb-4 w-48'>
                      <img src={selectedFile}/>
                    </div>
                    <label class="cursor-pointer mt-6">
                      <span class="mt-2 text-base leading-normal px-4 py-2 bg-pink-100 text-white text-sm rounded-full" htmlFor="image-upload" >Select Profile Picture</span>
                      <input type='file' multiple={false} accept="image/*" name='image-upload' id='image-upload' onChange={changePicture} class="hidden"/>
                    </label>
                  </div>
                </div>
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
              <p className="mt-1 text-sm text-gray-600">Details to your registered account</p>
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
                        value={accountData.email}
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
                        value={accountData.password}
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
                        value={accountData.confirmPass}
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
                        value={accountData.first_name}
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
                        value={accountData.last_name}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium text-darker-pink">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        autoComplete="gender"
                        className="mt-1 block w-full py-2 px-3 border border-pink-100 bg-white h-10 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={gender}
                        onChange={e=>setGender(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="diver">Diverse</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="height" className="block text-sm font-medium text-darker-pink">
                        Height
                      </label>
                      <input
                        type="text"
                        name="height"
                        id="height"
                        autoComplete="height"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-28 h-10 px-1 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                        placeholder='in cm'
                        value={height}
                        onChange={e=>setHeight(e.target.value)}
                      />
                    </div>

                     <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="nationality" className="block text-sm font-medium text-darker-pink">
                        Nationality
                      </label>
                      <Nationality handleNationality={handleNationality}></Nationality>
                    </div>

                    <div className="col-span-6 sm:col-span-3 menu-languages">
                      <label htmlFor="language" className="block text-sm font-medium text-darker-pink">
                        Language
                      </label>
                      <label for="my-modal" class="btn bg-darker-pink">Select Language</label>
                      <input type="checkbox" id="my-modal" class="modal-toggle" />
                      <div class="modal">
                        <div class="modal-box">
                          <h1 className='mb-4 text-lg font-normal text-darker-pink'>Select the Languages that you're good at!</h1>
                          <div class="flex flex-wrap">
                        {languages.map(({value, label})=>{
                            return(
                                <div key={value} className="form-check w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-gray-500">
                                    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  
                                    value={value} 
                                    id={value}
                                    name={value}
                                    checked={language.includes(value)}
                                    onChange={()=>handleOnChangeLanguage(value, language)}/>
                                    <label class="form-check-label inline-block text-gray-800">{label}</label>
                                </div>
                            );
                        })}
                        
                      </div>
                      <div className='flex flex-row justify-end'>
                        <div class="modal-action">
                            <label for="my-modal" class="btn inline-flex justify-center py-2 px-4 mr-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-darker-pink bg-gray-100 hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={resetLanguage}>Close</label>
                          </div>
                          <div class="modal-action">
                            <label for="my-modal" class="btn inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-pink-100 bg-darker-pink hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">OK</label>
                          </div>
                      </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="education" className="block text-sm font-medium text-darker-pink">
                        Occupation
                      </label>
                      <input
                        type="text"
                        name="education"
                        id="education"
                        autoComplete="education"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full xl:w-96 px-2 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                        placeholder='What have you been busy with?'
                        value={occupation}
                        onChange={e=>setOccupation(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="" className="block text-sm font-medium text-darker-pink">
                        Date of Birth
                      </label>
                      <input type="date" onChange={e=>setBirthDate(e.target.value)} className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block h-8 w-32 px-1 shadow-sm sm:text-sm border border-pink-100 rounded-md"/>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-darker-pink">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        autoComplete="description"
                        className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full h-28 px-2 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                        placeholder='Describe yourself...'
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
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
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Interest 
      hobbyList={hobbyList}
      genderInterests={genderInterests}
      handleOnChangeHobby={handleOnChangeHobby}
      removeHobby={removeHobby} 
      handleOnChangeGender={handleOnChangeGender}
      removeGender={removeGender}>
      </Interest>
      </div>     
    <div className="px-4 py-3 text-right sm:px-6">
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
  )
}

export default ProfileFields