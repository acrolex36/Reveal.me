import React from 'react'

const Hobbies = () => {
  return (
<div class="flex flex-wrap">
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="reading" id="reading"/>
    <label class="form-check-label inline-block text-gray-800">Reading
    </label>
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-400">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="dancing" id="dancing"/>
    <label class="form-check-label inline-block text-gray-800">
    Dancing
    </label>
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 bg-gray-500">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="Watching TV Shows and Movies" id="Watching TV Shows and Movies"/>
    Watch TV Shows and Movies
    </label>
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 bg-gray-400">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="Collecting Antiques" id="Collecting Antiques"/>
    Collecting Antiques
    </label>
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/2 xl:w-1/6 mb-4 bg-gray-500">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="Pottery" id="Pottery"/>
    Pottery
    </label>
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/2 xl:w-1/6 mb-4 bg-gray-400">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="painting" id="painting"/>
    Painting
    </label>  
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 bg-gray-500">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="play-music" id="play-music"/>
    Playing Music Intstrument
    </label>    
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/2 xl:w-1/3 mb-4 bg-gray-500">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="play-vidgame" id="play-vidgame"/>
    Playing Video Games
    </label>
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-400">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="photography" id="photography"/>
    Photography
    </label>    
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/2 xl:w-1/6 mb-4 bg-gray-400">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="cooking" id="cooking"/>
    Cooking  
    </label>
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/2 xl:w-1/6 mb-4 bg-gray-400">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="sport" id="sport"/>
    Sport
    </label>
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/2 xl:w-1/6 mb-4 bg-gray-400">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="travelling" id="travelling"/>
    Travelling
    </label>
  </div>
  <div class="form-check w-full sm:w-1/1.5 md:w-1/3 lg:w-1/2 xl:w-1/6 mb-4 bg-gray-400">
    <label class="form-check-label inline-block text-gray-800">
    <input type="checkbox" className=" checkbox form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-pink-0 checked:bg-pink-100 checked:border-darker-pink focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  value="drawing" id="drawing"/>
    Drawing
    </label>
  </div>
</div>
  )
}

export default Hobbies