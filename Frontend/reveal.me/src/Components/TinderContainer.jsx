import React, { useState, useMemo, useRef, useEffect } from "react";
import {TinderCard} from "react-tinder-card";
import ProfileCard from "./Profile/ProfileCard";
import love_button from "../images/love_button.png";
import reject_button from "../images/reject_button.png";
import back_button from "../images/back_button.png";
import axios from "axios";

const db = [
  {
    name: "Richard Hendricks",
    age: 19,
    profile_picture: "https://api.lorem.space/image/album?w=400&h=400",
    height: 177,
    education: "Student at Hochschule Darmstadt",
    language: ["English", "German"],
  },
  {
    name: "Erlich Bachman",
    age: 20,
    profile_picture: "https://api.lorem.space/image/album?w=400&h=400",
    height: 164,
    education: "Student at TU Darmstadt",
    language: ["English"],
  },
  {
    name: "Monica Hall",
    age: 23,
    profile_picture: "https://api.lorem.space/image/album?w=400&h=400",
    height: 187,
    education: "Student at Hochschule Darmstadt",
    language: ["Chinese", "English"],
  },
];

 // const getUser = async () => {
  // const token = cookies.Token;
  // const userList = await axios.get(
  //   `http://localhost:5000/api/test/alluser/`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json; charset=UTF-8",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
//   return userList;
// }

function TinderContainer() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);


  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;



  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.keyCode === 37) {
        console.log("back");
        swipe("left");
      } else if (e.keyCode === 39) {
        console.log("back");
        swipe("right");
      } else if (e.keyCode === 40) {
        console.log("back");
        goBack();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);



  return (
    <div>
      <div className="inset-center">
        {db.map((person, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={person.name}
            onSwipe={(dir) => swiped(dir, person.name, index)}
            onCardLeftScreen={() => outOfFrame(person.name, index)}
          >
            <div className="absolute">
              <ProfileCard person={person}></ProfileCard>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 flex flex-row justify-evenly w-1/2 ">
        <button
          className="sm:py-24 sm:px-6 lg:max-w-5xl "
          onClick={() => swipe("left")}
        >
          <div class="w-full aspect-w-1 aspect-h-1  overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              className="scale-50 hover:scale-75 ease-in duration-150"
              src={reject_button}
              alt="reject button"
            />
          </div>
        </button>
        <button
          className="sm:py-24 sm:px-6 lg:max-w-5xl "
          onClick={() => goBack()}
        >
          <div class="w-full aspect-w-1 aspect-h-1  overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              className="scale-50 hover:scale-75 ease-in duration-150"
              src={back_button}
              alt="back button"
            />
          </div>
        </button>
        <button
          className="sm:py-24 sm:px-6 lg:max-w-5xl "
          onClick={() => swipe("right")}
        >
          <div class="w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              className="scale-50 hover:scale-75 ease-in duration-75"
              src={love_button}
              alt="love button"
            />
          </div>
        </button>
      </div>
    </div>
  );
}

export default TinderContainer;
