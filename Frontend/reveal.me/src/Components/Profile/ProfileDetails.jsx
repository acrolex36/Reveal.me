import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Nationality from "./Nationality";
import Interest from "../Interest";
import { Languages } from "../../utils/Language";
import { userProfile } from "../../utils/ApiActions";
import { userDetail } from "../../utils/ApiActions";
import { getSingleUser } from "../../utils/ApiActions";

const ProfileDetails = () => {
  const [error, setError] = useState(null);
  const [cookies] = useCookies(null);
  const [DOB, setDOB] = useState("")
  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    userDetail: {
      gender: "",
      dob_date: "",
      dob_month: "",
      dob_year: "",
      age: "",
      profile_picture: "",
      occupation: "",
      gender_interest: [],
      height: "",
      hobbies: [],
      languages: [],
      nationality: "",
      description: "",
    },
  });

  //get user Account
  const getAccount = async (cookies) => {
    try {
      const id = cookies.UserId;
      const token = cookies.Token;
      const response = await getSingleUser(id, token);
      console.log(response);
      setAccountData(response.data);
      setDateBirth(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  //loads existing data in account
  useEffect(() => {
    if (cookies) {
      getAccount(cookies);
    }
  }, [cookies]);

  const navigate = useNavigate();

  //input profile picture
  const changePicture = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAccountData((accountData) => ({
          ...accountData,
          userDetail: {
            ...accountData.userDetail,
            profile_picture: reader.result,
          },
        }));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //add languages
  const handleOnChangeLanguage = (lang, language) => {
    if (language.includes(lang)) removeLanguage(lang);
    else {
      const updatedChecked = [...accountData.userDetail.languages];
      updatedChecked.push(lang);
      setAccountData((accountData) => ({
        ...accountData,
        userDetail: { ...accountData.userDetail, languages: updatedChecked },
      }));
    }
  };

  //remove languages
  const removeLanguage = (id) => {
    const updatedState = accountData.userDetail.languages.filter(
      (lang) => lang !== id
    );
    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, languages: updatedState },
    }));
  };

  //reset language
  const resetLanguage = () => {
    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, languages: [] },
    }));
  };

  const setDateBirth = () => {
    let date =" "
    let month =""
    if(accountData.userDetail){
if (accountData.userDetail.dob_date.length < 2) {
  date = "0" + accountData.userDetail.dob_date;
  console.log(accountData.userDetail.dob_date);
} else {
  date = accountData.userDetail.dob_date;
}
if (accountData.userDetail.dob_month.length < 2) {
  month = "0" + accountData.userDetail.dob_month;
} else month = accountData.userDetail.dob_month;

let year = accountData.userDetail.dob_year;
let dob = year + "-" + month + "-" + date;
setDOB(dob);
console.log(DOB);
    }
    
  }

  //set DOB
  const parseDOBandCalculateAge = (eventData) => {
    const parsed = eventData.split("-");
    var date = parsed[2];
    var month = parsed[1];
    var year = parsed[0];

    var today = new Date().toISOString().slice(0, 10);
    const parsedToday = today.split("-");
    var dateToday = parsedToday[2];
    var monthToday = parsedToday[1];
    var yearToday = parsedToday[0];
    var age = yearToday - year;
    var m = monthToday - month;
    if (m < 0 || (m === 0 && dateToday < date)) {
      age--;
    }

    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, dob_date: date },
    }));
    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, dob_month: month },
    }));
    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, dob_year: year },
    }));
    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, age: age },
    }));
  };

  //set user nationality
  const setNationality = (nat) => {
    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, nationality: nat },
    }));
  };

  //set user hobby
  const handleOnChangeHobby = (hobby) => {
    const updatedChecked = [...accountData.userDetail.hobbies];
    updatedChecked.push(hobby);
    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, hobbies: updatedChecked },
    }));
  };

  //uncheck user hobby
  const removeHobby = (id) => {
    const updatedState = accountData.userDetail.hobbies.filter(
      (hobby) => hobby !== id
    );
    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, hobbies: updatedState },
    }));
  };

  //remove gender interest
  const removeGender = (id) => {
    const updatedState = accountData.userDetail.gender_interest.filter(
      (gender) => gender !== id
    );

    setAccountData((accountData) => ({
      ...accountData,
      userDetail: { ...accountData.userDetail, gender_interest: updatedState },
    }));
  };


  const handleOnChangeGender = (gender) => {
    const updatedChecked = [...accountData.userDetail.gender_interest];
    updatedChecked.push(gender);
    setAccountData((accountData) => ({
      ...accountData,
      userDetail: {
        ...accountData.userDetail,
        gender_interest: updatedChecked,
      },
    }));
  };

  //submit user details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userProfile(accountData, cookies.Token).catch(function (res) {
        if (res.response.status === 404) {
          navigate("/create_profile");
          setError("failed to update Profile, please try again");
        }
      });

      await userDetail(accountData, cookies.Token)
        .then(function (response) {
          if (response.status === 200) {
            navigate("/homepage");
          }
        })
        .catch(function (res) {
          if (res.response.status === 404) {
            navigate("/create_profile");
            setError("failed to update Profile, please try again");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <form action="#" method="POST" onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-gray-50 space-y-6 sm:p-6 max-w-5xl my-5">
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 py-4 sm:px-0">
                  {/*Profile Picture Field*/}
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
                      <img
                        src={accountData.userDetail.profile_picture}
                        alt="profile picture"
                      />
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

          {/*Account Information Field */}
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
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block xl:w-96 w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                            defaultValue={accountData.email}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/*Personal Details*/}
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
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:outline-none focus:ring focus:ring-darker-pink block w-full shadow-sm sm:text-sm border border-pink-100 rounded-md"
                          value={accountData.first_name}
                          onChange={(e) =>
                            setAccountData({
                              ...accountData,
                              first_name: e.target.value,
                            })
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
                          onChange={(e) =>
                            setAccountData({
                              ...accountData,
                              last_name: e.target.value,
                            })
                          }
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
                          value={accountData.userDetail.gender}
                          onChange={(e) =>
                            setAccountData((accountData) => ({
                              ...accountData,
                              userDetail: {
                                ...accountData.userDetail,
                                gender: e.target.value,
                              },
                            }))
                          }
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="diverse">Diverse</option>
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
                          onChange={(e) =>
                            setAccountData((accountData) => ({
                              ...accountData,
                              userDetail: {
                                ...accountData.userDetail,
                                height: e.target.value,
                              },
                            }))
                          }
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
                          inputValue={accountData.userDetail.nationality}
                          passData={setNationality}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 menu-languages">
                        <label
                          htmlFor="language"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Language
                        </label>
                        <label
                          htmlFor="my-modal"
                          className="btn bg-darker-pink"
                        >
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
                              {Languages.map(({ value, label }) => {
                                return (
                                  <div
                                    key={value}
                                    className="form-check w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-gray-500"
                                  >
                                    <input
                                      type="checkbox"
                                      className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                      value={value}
                                      id={value}
                                      name={value}
                                      checked={accountData.userDetail.languages.includes(
                                        value
                                      )}
                                      onChange={() =>
                                        handleOnChangeLanguage(value, Languages)
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
                                  className="btn inline-flex justify-center py-2 px-4 mr-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-darker-pink bg-gray-100 hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                          onChange={(e) =>
                            setAccountData((accountData) => ({
                              ...accountData,
                              userDetail: {
                                ...accountData.userDetail,
                                occupation: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="date-of-birth"
                          className="block text-sm font-medium text-darker-pink"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={setDateBirth}
                          onChange={(e) =>
                            parseDOBandCalculateAge(e.target.value)
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
                          onChange={(e) =>
                            setAccountData((accountData) => ({
                              ...accountData,
                              userDetail: {
                                ...accountData.userDetail,
                                description: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Personal Interests*/}
        <div>
          <Interest
            hobbyList={accountData.userDetail.hobbies}
            genderInterests={accountData.userDetail.gender_interest}
            handleOnChangeHobby={handleOnChangeHobby}
            removeHobby={removeHobby}
            handleOnChangeGender={handleOnChangeGender}
            removeGender={removeGender}
          ></Interest>
        </div>
        <div className="px-4 py-3 text-right sm:px-6">
          <a
            href="/homepage"
            className="inline-flex justify-center py-2 px-4 mr-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-100 hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-darker-pink hover:bg-pink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <p>{error}</p>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
