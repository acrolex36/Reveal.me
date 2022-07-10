import {useEffect, useState,} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import ProfileCard from "../Components/Profile/ProfileCard";
import ProfileModal from "../Components/Profile/ProfileModal";
import {Hobbies} from "../utils/Hobby";

const ExplorePage = () => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userData, setUserData] = useState([]);
    const [cookies] = useCookies(null);
    const [hobbyFilter, setHobbyFilter] = useState(null);
    const token = cookies.Token;
    const myUserId = cookies.UserId;

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


    const hobbyFilterHandler = e => {
        const value = e.target.value
        setHobbyFilter(value);
    }

    return (
        <>
            <div className="flex flex-col h-screen bg-pink-50 ">
                <Header></Header>
                <div className="flex flex-1 ">
                    <Sidebar></Sidebar>
                    <main className="flex flex-col ">
                        <section className="my-20 mx-auto">
                            <select onChange={hobbyFilterHandler} className="select">
                                <option disabled selected>Hobby</option>
                                {
                                    Hobbies.map((hobby) => (
                                        <option>{hobby.hobby}</option>
                                    ))
                                }
                            </select>
                        </section>

                        <section className="mt-10 grid place-items-center grid-cols-3 gap-x-96">
                            {filteredUsers.length > 0 && userData.length > 0 && hobbyFilter !== null && (
                                filteredUsers.filter(person => person.userDetail.hobbies.includes(hobbyFilter)).map(person => (
                                    <div className="">
                                        <ProfileModal
                                            popup={<ProfileCard person={person}></ProfileCard>}></ProfileModal>
                                    </div>))
                            )}
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
};

export default ExplorePage;
