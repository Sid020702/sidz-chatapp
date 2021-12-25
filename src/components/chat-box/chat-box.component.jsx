import React from 'react'
import './chat-box.styles.scss'
import DisplayBox from '../display-box/display-box.component'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCurrentFriendName } from '../../redux/current-friend/current-friend.selectors'
import { storeMesage } from '../firebase/firebase.utils'



class ChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }
    }



    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });

    }

    handleClick = (event) => {
        event.preventDefault();
        const { currentUser, currentFriend } = this.props
        const { message } = this.state
        const messageInput = document.getElementById('messageInput')
        messageInput.value = '';
        storeMesage(currentUser, currentFriend, message)
    }


    render() {
        const { message } = this.state
        return (
            <div className='chatbox'>
                <DisplayBox />
                <div className="message-container">
                    <input type="text" name='message' id='messageInput' onChange={this.handleChange} value={message} />
                    <button type='submit' onClick={this.handleClick}>Send</button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentFriend: selectCurrentFriendName
})

export default connect(mapStateToProps)(ChatBox);