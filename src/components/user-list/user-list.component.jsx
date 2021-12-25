import React from "react";
import './user-list.styles.scss'
import { selectFriendsArray } from "../../redux/friends/friends.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import UserBox from "../user-box/user-box.component";


class UserList extends React.Component {





    render() {
        const { friends, currentUser } = this.props
        return (
            <div className="user-list" >
                <h2>Registered Users</h2>
                {


                    friends.filter(friend => friend.data().displayName !== currentUser.displayName).map((friend) =>
                        <UserBox key={friend.data().id} name={friend.data().displayName} />)
                }
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    friends: selectFriendsArray,
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(UserList);