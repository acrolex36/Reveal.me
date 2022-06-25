import React, {useState} from 'react'
import {hobbies} from "../utils/Hobbies"
import {Genders} from "../utils/Gender"
const Interest = ({hobbyList, genderInterests}) => {
    const [hobbyLists, setHobbies] = useState(hobbyList);
    const [genderInterest, setGenderInterests] = useState(genderInterests);
    const handleOnChangeHobby = (position) => {
        const updatedState = hobbyList.map((hobby, index)=>
            index === position ? !hobby : hobby
        );
        setHobbies(updatedState); 
        console.log(updatedState);
    }
    const handleOnChangeGender = (position) =>{
        const updatedState = genderInterest.map((gender, index)=>
            index === position ? !gender : gender
        );
        setGenderInterests(updatedState);
        console.log(updatedState);
    }
  return (
    <div className='shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-gray-50 space-y-6 sm:p-6 my-5'>
        <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Interests</h3>
              <p className="mt-1 text-sm text-gray-600">Fill in these specifications of your interest</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-gray-0 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 checkbox-hobby">
                      <label htmlFor="language" className="block text-sm font-medium text-darker-pink">
                        Hobby
                      </label>
                      <div class="flex flex-wrap">
                        {hobbies.map(({hobby}, index)=>{
                            return(
                                <div key={index} className="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
                                    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  
                                    value={hobby} 
                                    id={`hobby-${index}`}
                                    name={hobby}
                                    checked={hobbyLists[index]}
                                    onChange={()=>handleOnChangeHobby(index)}/>
                                    <label class="form-check-label inline-block text-gray-800">{hobby}</label>
                                </div>
                            );
                        })}
                        
                      </div>
                    </div>   

                    <div className="col-span-6 checkbox-hobby">
                        <label htmlFor="language" className="block text-sm font-medium text-darker-pink">
                            Gender Interest
                        </label>
                        <div class="flex flex-wrap">
                            {Genders.map(({gender}, index)=>{
                                return(
                                    <div key={index} class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
                                    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  
                                    value={gender} 
                                    id={`gender-${index}`}
                                    name={gender}
                                    checked={genderInterest[index]}
                                    onChange={()=>handleOnChangeGender(index)}
                                    />
                                    <label class="form-check-label inline-block text-gray-800">{gender}
                                    </label>
                            </div>
                                )
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
  )
}

export default Interest