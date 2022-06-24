import React from 'react'
import Hobbies from "./Hobbies"
const Interest = () => {
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
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-gray-0 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6 checkbox-hobby">
                      <label htmlFor="language" className="block text-sm font-medium text-darker-pink">
                        Hobby
                      </label>
                      <Hobbies></Hobbies>
                    </div>   

                    <div className="col-span-6 checkbox-hobby">
                        <label htmlFor="language" className="block text-sm font-medium text-darker-pink">
                            Gender Interest
                        </label>
                        <div class="flex flex-wrap">
                            <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
                                <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="male" id="reading"/>
                                <label class="form-check-label inline-block text-gray-800">Male
                                </label>
                            </div>
                            <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
                                <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="female" id="reading"/>
                                <label class="form-check-label inline-block text-gray-800">Female
                                </label>
                            </div>
                            <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
                                <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="diverse" id="reading"/>
                                <label class="form-check-label inline-block text-gray-800">Diverse
                                </label>
                            </div>
                        </div>
                    </div>
                    

                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div> 
    </div>
  )
}

export default Interest