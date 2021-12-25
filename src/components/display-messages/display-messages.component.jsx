import React from "react";
import './display-messages.styles.scss'
import { getFriendToUserRef } from "../firebase/firebase.utils";
import { getUserToFriendRef } from "../firebase/firebase.utils";
import { off, onValue, ref } from "@firebase/database";
import { get } from 'firebase/database'
import { createStructuredSelector } from "reselect";
import { getDatabase } from "@firebase/database";
import { selectPreviousFriendName } from "../../redux/current-friend/current-friend.selectors";
import { connect } from "react-redux";
import WithSpinnerClass from "../HOCs/with-spinner/with-spinner-class.component";

class DisplayMessages extends React.Component {

    componentDidMount() {
        this.display();
    }


    append = (message, position) => {
        const display = document.getElementById('display-messages')
        const text = document.createElement("div");
        const node = document.createTextNode(message);
        text.appendChild(node);
        text.classList.add(position);
        display.appendChild(text);

    }




    getStoredData = async (currentUser, currentFriend, prevFriend, sent, recieved) => {
        console.log('getStored')


        let i = 1;
        let j = 1;
        if (currentFriend) {
            document.getElementById('display-messages').innerHTML = ''
            if (prevFriend) {
                const db = getDatabase()
                const prevUserToFriendRef = ref(db, `users/${currentUser.displayName}/${prevFriend}`)
                const prevFriendToUserRef = ref(db, `users/${prevFriend}/${currentUser.displayName}`)
                off(prevUserToFriendRef);
                off(prevFriendToUserRef);
                console.log('unsubscribing from prev friend')
            }
            // const sentSnap = await get(getUserToFriendRef(currentUser, currentFriend))
            // const recievedSnap = await get(getFriendToUserRef(currentFriend, currentUser));
            // const sent = sentSnap.val();
            // const recieved = recievedSnap.val();
            while (i < sent.length && j < recieved.length) {
                if (sent[i].time < recieved[j].time) {
                    this.append(sent[i].message, 'right');
                    i++;
                }
                else {
                    this.append(recieved[j].message, 'left');
                    j++;
                }
            }

            while (i < sent.length) {
                this.append(sent[i].message, 'right');
                i++;
            }
            while (j < recieved.length) {
                this.append(recieved[j].message, 'left');
                j++;
            }

            console.log('passed')
        }

        else {
            return ''
        }
    }



    displaySent = () => {
        let i = 0;
        const { currentUser, currentFriend } = this.props
        if (currentFriend) {

            const friendSent = getUserToFriendRef(currentUser, currentFriend);
            onValue(friendSent, async (snapShot) => {
                if (i === 0) {
                    i++;
                    return
                }
                const friendSentObj = snapShot.val();
                if (friendSentObj.length === 1) {
                    return
                }

                this.append(friendSentObj[Object.keys(friendSentObj).slice(-1).pop()].message, 'right')
            }
            )
        }
    }



    displayRecieved = () => {
        let j = 0;
        const { currentUser, currentFriend, prevFriend } = this.props
        if (currentFriend) {
            const friendRecieved = getFriendToUserRef(currentFriend, currentUser);
            onValue(friendRecieved, async (snapShot) => {
                if (j === 0) {
                    return
                }
                if (prevFriend) {

                }

                const friendRecievedObj = snapShot.val();
                if (friendRecievedObj.length === 1) {
                    return
                }
                this.append(friendRecievedObj[Object.keys(friendRecievedObj).slice(-1).pop()].message, 'left')
            })
        }
    }



    display = () => {
        const { currentUser, currentFriend, prevFriend, sent, recieved } = this.props
        this.getStoredData(currentUser, currentFriend, prevFriend, sent, recieved);
        this.displaySent();
        this.displayRecieved();
    }







    render() {
        return (
            <div className="display-messages" id='display-messages'>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    prevFriend: selectPreviousFriendName
})




export default connect(mapStateToProps)(WithSpinnerClass(DisplayMessages));