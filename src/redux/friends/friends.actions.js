import FriendsActionTypes from "./friends.types";
import { firestore } from "../../components/firebase/firebase.utils";

export const fetchFriendsStart = () => ({
    type: FriendsActionTypes.FETCH_FRIENDS_START
})

export const fetchFriendsStartAsync = () => {
    return dispatch => {
        const usersRef = firestore.collection('users');
        dispatch(fetchFriendsStart());

        usersRef.get().then(snapshot => {
            const friendsList = snapshot.docs
            dispatch(fetchFriendsSuccess(friendsList));
        }).catch(error => dispatch(fetchFriendsFail(error.message)))
    }
}

export const fetchFriendsSuccess = list => ({
    type: FriendsActionTypes.FETCH_FRIENDS_SUCCESS,
    payload: list
})

export const fetchFriendsFail = errorMessage => ({
    type: FriendsActionTypes.FETCH_FRIENDS_FAIL,
    payload: errorMessage
})