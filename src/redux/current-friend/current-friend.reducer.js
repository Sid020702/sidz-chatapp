import { CurrentFriendActionTypes } from "./current-friend.types"
const INITIAL_STATE = {
    currentFriend: null,
    previousFriend: null
}

const CurrentFriendReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CurrentFriendActionTypes.SET_CURRENT_FRIEND:
            return {
                ...state,
                previousFriend: state.currentFriend,
                currentFriend: action.payload
            }

        default:
            return state

    }



}

export default CurrentFriendReducer