import { createSelector } from "reselect";

const selectFriends = state => state.friends

export const selectFriendsArray = createSelector(
    [selectFriends],
    reducer => reducer.friends
)

export const selectIsFriendsFetching = createSelector(
    [selectFriends],
    friends => friends.isFetching
)

export const selectIsFriendsLoaded = createSelector(
    [selectFriendsArray],
    friends => !!friends
)