import { combineReducers } from "redux";
import UserReducer from "./user/user-reducer";
import FriendsReducer from "./friends/friends.reducer";
import CurrentFriendReducer from "./current-friend/current-friend.reducer";

export default combineReducers({
    user: UserReducer,
    friends: FriendsReducer,
    currentFriend: CurrentFriendReducer
})