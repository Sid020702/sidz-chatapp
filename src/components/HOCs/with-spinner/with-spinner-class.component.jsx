import React from "react";
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles.jsx'
import { get } from 'firebase/database'
import { getFriendToUserRef } from "../../firebase/firebase.utils.js";
import { getUserToFriendRef } from "../../firebase/firebase.utils.js";
const WithSpinnerClass = WrappedComponent => {
    class Spinner extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                fetched: false,
                sent: null,
                recieved: null,
                friend: null
            }
        }





        shouldComponentUpdate(nextProps, nextState) {
            const { friend } = nextState
            const { currentFriend } = nextProps
            if (friend !== currentFriend) {
                this.setState({ fetched: false, sent: false, recieved: false, friend: currentFriend })
            }

            return true
        }


        componentDidUpdate() {
            const { fetched } = this.state
            if (!fetched) {
                this.fetchData();
            }
        }

        fetchData = async () => {
            console.log('fetchData called')
            const { currentFriend, currentUser } = this.props
            const sentSnap = await get(getUserToFriendRef(currentUser, currentFriend));
            const recievedSnap = await get(getFriendToUserRef(currentFriend, currentUser));
            this.setState({
                fetched: true,
                sent: sentSnap.val(),
                recieved: recievedSnap.val(),
            })

        }


        render() {
            const { currentFriend, currentUser, ...props } = this.props
            const { fetched, sent, recieved } = this.state


            console.log('With-Spinner Called')
            console.log(this.state)
            if (currentFriend) {
                if (fetched) {
                    return (<WrappedComponent currentFriend={currentFriend} currentUser={currentUser} {...props} sent={sent} recieved={recieved} />)
                }

                return (<SpinnerOverlay>
                    <SpinnerContainer />
                </SpinnerOverlay>)

            }

            return <WrappedComponent currentFriend={currentFriend} currentUser={currentUser} {...props} />


        }
    }
    return Spinner;
}


export default WithSpinnerClass;