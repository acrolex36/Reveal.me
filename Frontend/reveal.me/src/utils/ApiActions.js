import axios from "axios";

const BASE_URL = "http://localhost:5000/api"

//Auth

export const registerUser = async (userData) => {
    const response = await axios
        .post(`http://localhost:5000/api/auth/register`, userData)
    return response;
}

export const loginUser = async (userData) => {
    const response = await axios
        .post(`http://localhost:5000/api/auth/login`, userData)
    return response;
}

export const forgotPassword = async (userData) => {
    const response = await axios
        .post(`http://localhost:5000/api/auth/login/forgetpassword`, userData)
    return response;
}

//Create User

export const userProfile = async (userData, token) => {
    const response = await axios
        .put(
            `http://localhost:5000/api/user/profile/head/${userData.email}`,
            {
                first_name: userData.first_name,
                last_name: userData.last_name,
            },
            {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    return response;
}

export const userDetail = async (userData, token) => {
    const response = await axios
        .put(
            `http://localhost:5000/api/user/profile/body/${userData.email}`,
            userData.userDetail,
            {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    return response;
}

//User
export const getUserData = async (myUserId, token) => {
    const response = await axios.get(
        `${BASE_URL}/singleuser/id/${myUserId}`,
        {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    // setUserData((userData) => [...userData, response.data]);
    return response.data;
};

export const getFilteredUsers = async (myUserId, token) => {
    const response = await axios.get(
        `http://localhost:5000/api/filtereduser/id/${myUserId}`,
        {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const deleteOneMatch = async (myUserId, swipedId, token) => {
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
        console.log(response);
        console.log("Undo match user");
    } else {
        console.log("error undoing match user");
    }
}

export const updateSwipedUser = async (myUserId, swipedId, token) => {
    const response = await axios.put(
        `http://localhost:5000/api/user/profile/id/${myUserId}/${swipedId}`,
        {
            oneSideMatch: myUserId,
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

export const removeMatchedUser = async (myUserId, swipedId, token) => {
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

export const removeRejectedUser = async (myUserId, swipedId, token) => {
    const response = await axios.put(
        `${BASE_URL}/user/profile/swipedLeft/id/${myUserId}/${swipedId}`,
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

export const undoRejectUser = async (myUserId, token) => {
    const response = await axios.put(
        `http://localhost:5000/api/user/profile/swipedleft/remove/id/${myUserId}`,
        {},
        {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.status === 200) {
        console.log("Undo reject user");
    } else {
        console.log("error undoing reject user");
    }
}

export const getSingleUser = async (id, token) => {
    const response = await axios.get(
        `http://localhost:5000/api/singleuser/id/${id}`,
        {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
}

//Conversation
export const createConversation = async (myUserId, swipedId, token) => {
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
        console.log("conversation made ")
    } else {
        console.log("error making convo");
    }
}

export const getAllConversation = async (myUserId, token) => {
    //Get all conversation
    const response = await axios.get(
        `http://localhost:5000/api/allconversation/${myUserId}`,
        {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.status === 200) {
        console.log("Get conversation");
        return response.data;
    } else {
        console.log("error Get conversation");
    }
}

export const deleteConversation = async (conversationId, token) => {
    const response = await axios.delete(
        `http://localhost:5000/api/conversation/remove/${conversationId}`,
        {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.status === 200) {
        console.log("Deleted created conversation");
        return response.data;
    } else {
        console.log("error delete created conversation");
    }
}

export const getPicture = async (conversationId, userId, token) => {
    const response = await axios.get(
        `http://localhost:5000/api/conversation/user/picture/${conversationId}/${userId}`,
        {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
}

export const sendMessages = async (conversationId, id, token, message) => {
    const response = await axios.post(
        `http://localhost:5000/api/message/${conversationId}`,
        {
            userId: id,
            message: message,
        },
        {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
}

export const getMessagesInConversation = async (conversationId, token) => {
    const response = await axios.get(
        `http://localhost:5000/api/message/all/${conversationId}`,
        {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
}




