import FriendsActionTypes from "./friends.types"
const INITIAL_STATE = {
    friends: null,
    isFetching: false,
    errorMessage: undefined
}

const FriendsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FriendsActionTypes.FETCH_FRIENDS_START:
            return {
                ...state,
                isFetching: true
            }
        case FriendsActionTypes.FETCH_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: action.payload,
                isFetching: false
            }
        case FriendsActionTypes.FETCH_FRIENDS_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }

}

export default FriendsReducer;