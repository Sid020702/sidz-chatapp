import React from "react";
import './user-box.styles.scss'
import { setCurrentFriend } from "../../redux/current-friend/current-friend.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentFriendName } from "../../redux/current-friend/current-friend.selectors";

const UserBox = ({ name, setCurrentFriend }) => (
    <div className='user-box' onClick={() => {
        setCurrentFriend(name)
    }} >
        <h4>{name}</h4>
    </div >
)


const mapDispatchToProps = dispatch => ({
    setCurrentFriend: friend => dispatch(setCurrentFriend(friend)),
})

export default connect(null, mapDispatchToProps)(UserBox)