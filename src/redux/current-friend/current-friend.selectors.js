import { createSelector } from "reselect"
import { memoize } from 'lodash'

const selectCurrentFriend = memoize(state => state.currentFriend)

export const selectCurrentFriendName = createSelector(
    [selectCurrentFriend],
    friend => friend.currentFriend
)

export const selectPreviousFriendName = createSelector(
    [selectCurrentFriend],
    friend => friend.previousFriend
)