import { CurrentFriendActionTypes } from "./current-friend.types"

export const setCurrentFriend = (friend) => ({
    type: CurrentFriendActionTypes.SET_CURRENT_FRIEND,
    payload: friend
})