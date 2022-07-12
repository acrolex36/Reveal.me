import axios from "axios";

//User

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
        console.log("conversation made made")
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



