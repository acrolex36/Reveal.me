import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nationality from "./Nationality";
import Language from "./Language";
import Interest from "./Interest";
import { hobbies } from "../utils/Hobbies";
import { Genders } from "../utils/Gender";
import { languages } from "../utils/Language";
import axios from "axios";
import { Cookies, useCookies } from 'react-cookie'

//Token = cookies.Token

const ProfileFields = () => {

  const [selectedFile, setSelectedFile] = useState("");

  const [gender, setGender] = useState("");

  // const [height, setHeight] = useState("");
  const [nationality, setNationality] = useState("");
  const [language, setLanguage] = useState(
    new Array(languages.length).fill(false)
  );
  const [occupation, setOccupation] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [description, setDescription] = useState("");
  const [hobbyList, setHobbies] = useState(
    new Array(hobbies.length).fill(false)
  );
  // const [genderInterests, setGenderInterests] = useState(
  //   new Array(Genders.length).fill(false)
  // );
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState(null);
  const [ cookies, setCookie, removeCookie] = useCookies(null);
  const [accountData, setAccountData] = useState({
      // user_id: cookies.UserId,
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      userDetail: {
        gender: "",
        dob_date: "",
        dob_month:"",
        dob_year: "",
        occupation: "",
        gender_interest: [],
        height: "",
        interest: [],
        language: [],
        nationality: "",
        description: ""
      }
    });

  const getAccount = async (cookies) =>
  {
    try{  
      // const email = cookies.Email;
      const id = cookies.UserId
      const token = cookies.Token
      const response = await axios.get(`http://localhost:5000/api/test/singleuser/${id}`,{
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      setAccountData(response.data);
    } catch (err){
      console.error(err.message);
    }
  };

    useEffect(() => {
        // console.log("i fire once");
      if(cookies){
        getAccount(cookies);
      }
    }, [cookies]);
  
    const navigate = useNavigate();

  // const routeChange = (newPath) => {
  //   let path = newPath;
  //   navigate(path);
  // };

  const changePicture = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  
  const handleOnChangeLanguage = (position) => {
    const updatedState = language.map((value, index) =>
      index === position ? !value : value
    );
    setLanguage(updatedState);
    console.log(updatedState);
  };

  const resetLanguage = () => {
    const updatedState = language.map((value, index) =>
      value === true ? !value : value
    );
    setLanguage(updatedState);
    console.log(updatedState);
  };

  const handleNationality = (nat) => {
    setNationality(nat);
  };

  // const handleOnChangeHobby = (position) => {
  //   const updatedState = hobbyList.map((hobby, index) =>
  //     index === position ? !hobby : hobby
  //   );
  //   setHobbies(updatedState);
  //   console.log(updatedState);
  // };
  // const handleOnChangeGender = (position) => {
  //   const updatedState = genderInterests.map((gender, index) =>
  //     index === position ? !gender : gender
  //   );
  //   setGenderInterests(updatedState);
  //   console.log(updatedState);
  // };

  const parseDOB = (eventData) => {
    const parsed = eventData.split("-")
    var date = parsed[2];
    var month = parsed[1];
    var year = parsed[0];
    // console.log(date)
    // console.log(month)
    // console.log(year)

    setAccountData({...accountData, userDetail:{dob_date: date, dob_month: month, dob_year: year}})
    // setAccountData({...accountData, userDetail:{dob_month: month}})
    // setAccountData({...accountData, userDetail:{dob_year: year}})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // console.log(accountData);
      console.log(accountData.userDetail.height);
      console.log(accountData.userDetail.occupation);


      // await axios
      // .put(`http://localhost:5000/api/user/profile/${accountData.email}`, { accountData })
      // .then(function(response){
      //   if(response.status == 201){

      //     setCookie("UserId", response.data.userId);
      //     // setCookie("Email", response.data.email);
      //     setCookie("Token", response.data.token);

      //     navigate ('/');
      //     // navigate ('/create_profile');
      //   }
      // })
      // .catch(function(res){
      //   if(res.response.status == 404){
      //     navigate ('/create_profile');
      //     setError('failed to update Profile, please try again');
      //   }
      // });

        // window.location.reload()

    } catch (error) {
        console.log(error)
    }

}

  return (
    <div>
      <form action="#" method="POST" onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-gray-50 space-y-6 sm:p-6 my-5">
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 py-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Profile Picture
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This Picture will be blurred/pixelized until you've reached
                    the max amount of chats with a person!
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="py-3 center mx-auto">
                  <div className="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-fit">
                    <div className="mb-4 w-48">
                      <img src={selectedFile} />
                    </div>
                    <label className="cursor-pointer mt-6">
                      <span
                        className="mt-2 text-base leading-normal px-4 py-2 bg-pink-100 text-white text-sm rounded-full"
                        htmlFor="image-upload"
                      >
                        Select Profile Picture
                      </span>
                      <input
                        type="file"
                        multiple={false}
                        accept="image/*"
                        name="image-upload"
                        id="image-upload"
                        onChange={changePicture}
                        className="hidden"
                      />
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
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Account Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Details to your registered account
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-gray-0 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-darker-pink"
                          >
                            Email address
                          </label>
                          {/* WHY CANNOT BE EDITED */}
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block xl:w-96 w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                            value={accountData.email}
                            onChange={(e) => setAccountData({...accountData, email:e.target.value})}
                          />
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-darker-pink"
                          >
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
                          <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-darker-pink"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            autoComplete="confirm-password"
                            className="mt-1 focus:outline-none bg-gray-100 focus:ring focus:ring-darker-pink block w-full xl:w-96 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                            disabled="true"
                            value={accountData.password}
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
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Personal Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Give us these little details about you!
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-gray-0 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          autoComplete="first_name"
                          label="first_name"
                          className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                          value={accountData.first_name}
                          onChange={(e) => setAccountData({...accountData, first_name: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                          value={accountData.last_name}
                          onChange={(e)=>setAccountData({...accountData, last_name: e.target.value})}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          autoComplete="gender"
                          className="mt-1 block w-full py-2 px-3 border border-pink-100 bg-white h-10 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="diver">Diverse</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="height"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Height
                        </label>
                        <input
                          type="text"
                          name="height"
                          id="height"
                          autoComplete="height"
                          className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-28 h-10 px-1 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                          placeholder="in cm"
                          value={accountData.userDetail.height}
                          onChange={(e) => setAccountData({...accountData, userDetail:({height: e.target.value})})}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="nationality"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Nationality
                        </label>
                        <Nationality
                          handleNationality={handleNationality}
                        ></Nationality>
                      </div>

                      <div className="col-span-6 sm:col-span-3 menu-languages">
                        <label
                          htmlFor="language"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Language
                        </label>
                        <label htmlFor="my-modal" class="btn bg-darker-pink">
                          Select Language
                        </label>
                        <input
                          type="checkbox"
                          id="my-modal"
                          className="modal-toggle"
                        />
                        <div className="modal">
                          <div className="modal-box">
                            <h1 className="mb-4 text-lg font-normal text-darker-pink">
                              Select the Languages that you're good at!
                            </h1>
                            <div className="flex flex-wrap">
                              {languages.map(({ value, label }, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="form-check w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-gray-500"
                                  >
                                    <input
                                      type="checkbox"
                                      className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                      value={value}
                                      id={`language-${index}`}
                                      name={value}
                                      checked={language[index]}
                                      onChange={() =>
                                        handleOnChangeLanguage(index)
                                      }
                                    />
                                    <label className="form-check-label inline-block text-gray-800">
                                      {label}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex flex-row justify-end">
                              <div className="modal-action">
                                <label
                                  htmlFor="my-modal"
                                  class="btn inline-flex justify-center py-2 px-4 mr-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-darker-pink bg-gray-100 hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  onClick={resetLanguage}
                                >
                                  Close
                                </label>
                              </div>
                              <div className="modal-action">
                                <label
                                  htmlFor="my-modal"
                                  className="btn inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-pink-100 bg-darker-pink hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  OK
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="occupation"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Occupation
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          id="occupation"
                          autoComplete="occupation"
                          className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full xl:w-96 px-2 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                          placeholder="What have you been busy with?"
                          value={accountData.userDetail.occupation}
                          onChange={(e) => setAccountData({...accountData, userDetail:{occupation:e.target.value}})}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          onChange={(e) => 
                            parseDOB(e.target.value)
                            // setBirthDate(e.target.value)
                          }
                          className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block h-8 w-32 px-1 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          autoComplete="description"
                          className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full h-28 px-2 shadow-sm sm:text-sm border border-pink-100 rounded-md"
                          placeholder="Describe yourself..."
                          value={accountData.userDetail.description}
                          onChange={(e) => setAccountData({...accountData, userDetail:{description:e.target.value}})}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Location
                        </label>
                        <button
                          type="button"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-100 hover:bg-darker-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
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
        {/* <div><Interest handleOnChangeHobby={handleOnChangeHobby} handleOnChangeGender={handleOnChangeGender}></Interest></div>      */}
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            className="inline-flex justify-center py-2 px-4 mr-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-100 hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => routeChange("/register")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <p>{error}</p>
        </div>
      </form>
    </div>
  );
};

export default ProfileFields;
