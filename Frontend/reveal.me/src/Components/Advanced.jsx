import React, { useState, useMemo, useRef } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import Profile from "./Profile";
import love_button from "../images/love_button.png";
import reject_button from "../images/reject_button.png";
import back_button from "../images/back_button.png";

const db = [
  {
    name: "Richard Hendricks",
    url: "./img/richard.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "./img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "./img/monica.jpg",
  },
  {
    name: "Jared Dunn",
    url: "./img/jared.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "./img/dinesh.jpg",
  },
];

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
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

  return (
    <div>
      <div className="absolute top-1/4 left-3/5">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={character.name}
            class=""
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div className="absolute">
              <Profile></Profile>
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

export default Advanced;
