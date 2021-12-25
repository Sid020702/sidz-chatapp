import React from "react";
import { createStructuredSelector } from "reselect";
import { selectCurrentFriendName } from "../../redux/current-friend/current-friend.selectors";
import DisplayHeader from "../display-header/display-header.component";
import './display-box.styles.scss'
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import DisplayMessages from "../display-messages/display-messages.component";


const DisplayBox = ({ currentFriend, currentUser }) => (
    <div className='display-box'>

        <DisplayHeader friend={currentFriend} />
        <DisplayMessages currentUser={currentUser} currentFriend={currentFriend} />




    </div>
)




const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentFriend: selectCurrentFriendName
})

export default connect(mapStateToProps)(DisplayBox);