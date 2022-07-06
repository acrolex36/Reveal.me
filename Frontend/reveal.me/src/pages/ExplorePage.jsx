import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import ProfileCard from "../Components/Profile/ProfileCard";
import {useEffect, useState,} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

const HomePage = () => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userData, setUserData] = useState([]);
    const [cookies] = useCookies(null);
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

    return (
        <>
            <div className="flex flex-col h-screen bg-pink-50 ">
                <Header></Header>
                <div className="flex flex-1">
                    <Sidebar>
                    </Sidebar>
                    <main>
                        {filteredUsers.length > 0 && userData.length > 0 && (
                            filteredUsers.map(person => {
                                <div>{person.length}</div>
                            })
                        )}
                    </main>
                </div>
            </div>
        </>
    )
        ;
};

export default HomePage;
