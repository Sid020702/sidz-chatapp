import React from 'react';
import './App.css';
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user-actions';
import { auth } from './components/firebase/firebase.utils'
import { createUserProfileDocument } from './components/firebase/firebase.utils';
import HomePage from './pages/home/home.component';
import { fetchFriendsStartAsync } from './redux/friends/friends.actions';
import { selectIsFriendsLoaded } from './redux/friends/friends.selectors';
import WithSpinner from './components/HOCs/with-spinner/with-spinner.component';


const HomePageWithSpinner = WithSpinner(HomePage);
class App extends React.Component {

  unsubcribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, fetchFriendsStartAsync } = this.props
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
          fetchFriendsStartAsync()



        })


      }

      setCurrentUser(null);
    })



  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }



  render() {
    const { currentUser, isFriendsLoaded } = this.props
    return (
      <div className="App">
        {
          currentUser ? (
            <HomePageWithSpinner isLoading={!isFriendsLoaded} />
          ) : <SignInAndSignOutPage />
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isFriendsLoaded: selectIsFriendsLoaded
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  fetchFriendsStartAsync: () => dispatch(fetchFriendsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
