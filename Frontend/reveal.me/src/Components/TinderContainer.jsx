import React, {useState, useMemo, useRef, useEffect} from "react";
import TinderCard from "react-tinder-card";
import ProfileCard from "./Profile/ProfileCard";
import love_button from "../images/love_button.png";
import reject_button from "../images/reject_button.png";
import back_button from "../images/back_button.png";
import {useCookies} from "react-cookie";
import {
    deleteOneMatch,
    updateSwipedUser,
    removeMatchedUser,
    removeRejectedUser,
    undoRejectUser,
    createConversation,
    getAllConversation,
    deleteConversation,
    getFilteredUsers,
    getUserData
} from "../utils/ApiActions"

function TinderContainer() {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cookies] = useCookies(null);
    const [userData, setUserData] = useState([]);
    const [lastSwipedUsers, setLastSwipedUsers] = useState([]);
    const [lastSwipeDirection, setLastSwipeDirection] = useState([]);
    const token = cookies.Token;
    const myUserId = cookies.UserId;

    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex);

    const fetchData = async () => {
        const user = await getUserData(myUserId, token);
        setUserData((userData) => [...userData, user]);
        const list = await getFilteredUsers(myUserId, token);
        setFilteredUsers((filteredUsers) => [...filteredUsers, ...list]);
    }

    useEffect(() => {
        fetchData();
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
    const swiped = (direction, swipedId, index) => {
        updateCurrentIndex(index - 1);
    };


    const outOfFrame = async (dir, name, idx, swipedId) => {
        setLastSwipedUsers(lastSwipedUsers => [...lastSwipedUsers, swipedId]);
        setLastSwipeDirection(lastSwipeDirection => [...lastSwipeDirection, dir]);
        console.log(userData.at(0));
        if (dir === "right") {
            if (userData.at(0).oneSideMatch.includes(swipedId)) {
                alert("IT'S A MATCH!");
                await createConversation(myUserId, swipedId, token);
                await removeMatchedUser(myUserId, swipedId, token);
            } else {
                await updateSwipedUser(myUserId, swipedId, token);
            }
        }
        if (dir === "left") {
            await removeRejectedUser(myUserId, swipedId, token);
        }
    };

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < filteredUsers.length) {
            await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
        }
    };

    const undoSwipeRight = async (myUserId, swipedId) => {
        let allConversation = await getAllConversation(myUserId, token);

        // if a new conversation is made, then delete
        if (allConversation.length !== 0) {
            console.log("allconversation " + allConversation.length)
            for (const conversation of allConversation) {
                if (conversation.members.includes(swipedId)) {
                    await deleteConversation(conversation._id, token);
                    return;
                }
            }
        }
        //else delete onematch om swipeduser
        await deleteOneMatch(myUserId, swipedId, token);
    }

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return;
        const newIndex = currentIndex + 1;
        updateCurrentIndex(newIndex);
        await childRefs[newIndex].current.restoreCard();

        let lastDirection = lastSwipeDirection.at(lastSwipeDirection.length - 1);
        let lastSwiped = lastSwipedUsers.at(lastSwipedUsers.length - 1);

        if (lastDirection === "left") {
            await undoRejectUser(myUserId, token);
        }
        if (lastDirection === "right") {
            await undoSwipeRight(myUserId, lastSwiped);
        }
        //Remove last element of array state
        setLastSwipedUsers(lastSwipedUsers => {
            const next = [...lastSwipedUsers];
            next.pop();
            return next;
        })
        setLastSwipeDirection(lastSwipeDirection => {
            const next = [...lastSwipeDirection];
            next.pop();
            return next;
        })


    };

    useEffect(() => {
        const handleKey = (e) => {
            if (e.keyCode === 37) {
                console.log("left");
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
                <div className="absolute top-64 left-188 flex justify-center">
                    {filteredUsers.map((person, index) => (
                        <TinderCard
                            preventSwipe={["up", "down"]}
                            ref={childRefs[index]}
                            key={person._id}
                            onSwipe={(dir) => swiped(dir, person._id, index)}
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
            )}
            <div
                className="absolute top-128 left-148 w-1/2 flex flex-row justify-evenly ">
                <button
                    id="swipeLeftButton"
                    className="sm:py-24 sm:px-6 lg:max-w-5xl "
                    onClick={() => swipe("left")}
                >
                    <div className="w-full aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                            className="scale-50 hover:scale-75 ease-in duration-150"
                            src={reject_button}
                            alt="reject button"
                        />
                    </div>
                </button>
                <button
                    id="goBackButton"
                    className="sm:py-24 sm:px-6 lg:max-w-5xl "
                    onClick={() => goBack()}
                >
                    <div className="w-full aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                            className="scale-50 hover:scale-75 ease-in duration-150"
                            src={back_button}
                            alt="back button"
                        />
                    </div>
                </button>
                <button
                    id="swipeRightButton"
                    className="sm:py-24 sm:px-6 lg:max-w-5xl "
                    onClick={() => swipe("right")}
                >
                    <div className="w-full aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
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
