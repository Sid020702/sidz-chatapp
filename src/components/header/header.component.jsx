import React from 'react'
import './header.styles.scss'
import { auth } from '../firebase/firebase.utils';
import { setCurrentFriend } from '../../redux/current-friend/current-friend.actions';
import { connect } from 'react-redux';


const Header = ({ setCurrentFriend }) => (
    <div className='header'>
        <button className="btn btn-outline-success" type="submit" onClick={() => {
            auth.signOut()
            setCurrentFriend(null)

        }
        }>Sign out</button>
    </div>

)


const mapDispatchToProps = dispatch => ({
    setCurrentFriend: friend => dispatch(setCurrentFriend(friend))
})


export default connect(null, mapDispatchToProps)(Header);