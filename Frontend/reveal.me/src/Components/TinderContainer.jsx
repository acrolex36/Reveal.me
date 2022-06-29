import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import ProfileCard from "./Profile/ProfileCard";
import love_button from "../images/love_button.png";
import reject_button from "../images/reject_button.png";
import back_button from "../images/back_button.png";
import axios from "axios";
import { useCookies } from "react-cookie";

function TinderContainer() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(filteredUsers.length - 1);
  const [cookies] = useCookies(null);
  const [userData, setUserData] = useState([]);

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const token = cookies.Token;

    const getUserData = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/test/singleuser/id/${cookies.UserId}`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData((userData) => [...userData, response.data]);
    };
    const getFilteredUsers = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/test/alluser/`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFilteredUsers((filteredUsers) => [...filteredUsers, ...response.data]);
    };
    if (cookies) {
      getFilteredUsers(cookies);
      getUserData();
    }
  }, []);

  const childRefs = useMemo(
    () =>
      Array(filteredUsers.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < filteredUsers.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = async (dir, name, idx, swipedId) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    const token = cookies.Token;
    if (dir === "right") {
      if (userData.at(0).oneSideMatch.includes(swipedId)) {
        alert("IT'S A MATCH");
      }
      const response = await axios.put(
        `http://localhost:5000/api/user/profile/id/${cookies.UserId}/${swipedId}`,
        {
          oneSideMatch: cookies.UserId,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.log("error updating");
      }
    }

    // handle the case in which go back is pressed before card goes outOfFrame
    // currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < filteredUsers.length) {
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
      {filteredUsers.length > 0 && userData.length > 0 && (
        <>
          <div className="inset-center">
            {filteredUsers.map((person, index) => (
              <TinderCard
                preventSwipe={["up", "down"]}
                ref={childRefs[index]}
                onSwipe={(dir) => swiped(dir, person.first_name, index)}
                onCardLeftScreen={(dir) =>
                  outOfFrame(dir, person.first_name, index, person._id)
                }
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
              <div className="w-full aspect-w-1 aspect-h-1  overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
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
              <div className="w-full aspect-w-1 aspect-h-1  overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
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
              <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  className="scale-50 hover:scale-75 ease-in duration-75"
                  src={love_button}
                  alt="love button"
                />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TinderContainer;
