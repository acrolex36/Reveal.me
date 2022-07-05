import React, { useState } from "react";
import { Hobbies } from "../utils/Hobby";
import { Genders } from "../utils/Gender";
const Interest = (props) => {
  const {
    hobbyList,
    genderInterests,
    handleOnChangeHobby,
    removeHobby,
    handleOnChangeGender,
    removeGender,
  } = props;

  const handleHobby = (hobby, hobbyList) => {
    if (hobbyList.includes(hobby)) removeHobby(hobby);
    else {
      handleOnChangeHobby(hobby);
    }
  };
  const handleGender = (gender, genderInterests) => {
    if (genderInterests.includes(gender)) removeGender(gender);
    else {
      handleOnChangeGender(gender);
    }
  };
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-gray-50 space-y-6 sm:p-6 max-w-5xl my-5">
      <div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Interests
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Fill in these specifications of your interest
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-gray-0 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 checkbox-hobby">
                      <label
                        htmlFor="hobby"
                        className="block text-sm font-medium text-darker-pink"
                      >
                        Hobby
                      </label>
                      <div class="flex flex-wrap">
                        {Hobbies.map(({ hobby }) => {
                          return (
                            <div
                              key={hobby}
                              className="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500"
                            >
                              <input
                                type="checkbox"
                                className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                value={hobby}
                                id={hobby}
                                name={hobby}
                                checked={hobbyList.includes(hobby)}
                                onChange={() => handleHobby(hobby, hobbyList)}
                              />
                              <label className="form-check-label inline-block text-gray-800">
                                {hobby}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="col-span-6 checkbox-gender-interest">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-darker-pink"
                      >
                        Gender Interest
                      </label>
                      <div class="flex flex-wrap">
                        {Genders.map(({ gender }) => {
                          return (
                            <div
                              key={gender}
                              className="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500"
                            >
                              <input
                                type="checkbox"
                                className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                value={gender}
                                id={gender}
                                name={gender}
                                checked={genderInterests.includes(gender)}
                                onChange={() =>
                                  handleGender(gender, genderInterests)
                                }
                              />
                              <label className="form-check-label inline-block text-gray-800">
                                {gender}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interest;
