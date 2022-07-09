import React, {useState, useMemo, useRef, useEffect} from "react";
import TinderCard from "react-tinder-card";
import ProfileCard from "./Profile/ProfileCard";
import love_button from "../images/love_button.png";
import reject_button from "../images/reject_button.png";
import back_button from "../images/back_button.png";
import axios from "axios";
import {useCookies} from "react-cookie";


function TinderContainer() {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cookies] = useCookies(null);
    const [userData, setUserData] = useState([]);
    const token = cookies.Token;
    const myUserId = cookies.UserId;


    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex);

    // Fetch data
    useEffect(() => {
        const getUserData = async () => {
            const response = await axios.get(
                `http://localhost:5000/api/singleuser/id/${myUserId}`,
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
                `http://localhost:5000/api/filtereduser/id/${myUserId}`,
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
            getFilteredUsers();
            getUserData();
        }
    }, []);

    useEffect(() => setCurrentIndex(filteredUsers?.length - 1), [filteredUsers])

    const childRefs = useMemo(
        () =>
            Array(filteredUsers.length)
                .fill(0)
                .map(() => React.createRef()),
        [filteredUsers]
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


    const createConversation = async (swipedId) => {
        const response = await axios.post(
            `http://localhost:5000/api/conversation/message/${myUserId}/${swipedId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 201) {
            console.log("conversation made made")
        } else {
            console.log("error making convo");
        }
    }

    const removeMatchedUser = async (swipedId) => {
        const response = await axios.put(
            `http://localhost:5000/api/user/profile/remove/id/${myUserId}/${swipedId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            console.log("matched user removed from myuser onematchlist")
        } else {
            console.log("error making convo");
        }
    }

    const updateSwipedUser = async (swipedId) => {
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

    const removeRejectedUser = async (swipedId) => {
        const response = await axios.put(
            `http://localhost:5000/api/user/profile/swipedLeft/id/${myUserId}/${swipedId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            console.log("rejected user removed from myuser potential list")
        } else {
            console.log("error removing rejected user ");
        }
    }

    const outOfFrame = async (dir, name, idx, swipedId) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
        if (dir === "right") {
            if (userData.at(0).oneSideMatch.includes(swipedId)) {
                alert("IT'S A MATCH! ");
                await createConversation(swipedId);
                await removeMatchedUser(swipedId);
            } else {
                await updateSwipedUser(swipedId);
            }
        }
        if(dir === "left"){
            await removeRejectedUser(swipedId);
        }
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
                () => swipe("left");
            } else if (e.keyCode === 39) {
                () => swipe("right");
            } else if (e.keyCode === 40) {
                () => goBack();
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
                    <div className="absolute top-64 left-188 flex justify-center">
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
                    <div
                        className="absolute top-128 left-148 w-1/2 flex flex-row justify-evenly ">
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
