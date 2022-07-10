const ProfileModal = ({popup}) => {
    return (<>
            <label htmlFor={popup.props.person._id} className="btn bg-darker-pink modal-button">{popup.props.person.first_name}</label>

            <input type="checkbox" id={popup.props.person._id} className="modal-toggle"/>
            <label htmlFor={popup.props.person._id} className="modal cursor-pointer">
                {popup}
            </label>
        </>
    );
};
export default ProfileModal;
