const ProfileModal = ({handleMatch, popup}) => {

    const onButtonPress = (matchedId) => {
        handleMatch(matchedId)
    }

    return (
        <>
            <label htmlFor={popup.props.person._id}
                   className="btn bg-darker-pink modal-button ">{popup.props.person.first_name}</label>
            <input type="checkbox" id={popup.props.person._id} className="modal-toggle"/>
            <label htmlFor={popup.props.person._id} className="modal cursor-pointer">
                <div className="flex flex-col items-center">
                    {popup}
                    <button onClick={() => onButtonPress(popup.props.person._id)}
                            className="mt-5 btn btn gap-2 bg-darker-pink border-none hover:bg-pink-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="black">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        <p className="text-black">
                            Match
                        </p>
                    </button>
                </div>
            </label>
        </>
    );
};
export default ProfileModal;
