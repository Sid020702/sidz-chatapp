import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyC-WYbMAxefI30eZgmaX6kpiwD1SjRYIR4",
    authDomain: "sidz-chatapp-3f7b1.firebaseapp.com",
    projectId: "sidz-chatapp-3f7b1",
    storageBucket: "sidz-chatapp-3f7b1.appspot.com",
    messagingSenderId: "1026836422274",
    appId: "1:1026836422274:web:3289fdaec2094c24f41e9b",
    measurementId: "G-6XBEKX93HL"
};





export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating User', error.message);
        }
    }
    return userRef

}

firebase.initializeApp(firebaseConfig);



export const writeUserData = async ({ displayName, email }) => {
    const db = getDatabase();
    const usersRef = firestore.collection('users/');


    const users = (await usersRef.get()).docs
    const friends = users.filter((user) => (user.data()).displayName !== displayName)
    friends.map(async friend => {
        await set(ref(db, `users/${displayName}/${(friend.data()).displayName}`), {
            0: (friend.data()).email
        })

        await set(ref(db, `users/${friend.data().displayName}/${displayName}`), {
            0: email
        })

    })



}

export const getUserToFriendRef = (currentUser, currentFriend) => {
    const db = getDatabase();
    const friendRef = ref(db, `users/${currentUser.displayName}/${currentFriend}`)
    return friendRef;
}
export const getFriendToUserRef = (currentFriend, currentUser) => {
    const db = getDatabase();
    const friendRef = ref(db, `users/${currentFriend}/${currentUser.displayName}`)
    return friendRef;
}


export const storeMesage = (currentUser, currentFriend, message) => {
    const friendRef = getUserToFriendRef(currentUser, currentFriend);
    const db = getDatabase()

    onValue(friendRef, async (snapShot) => {
        const friendObj = snapShot.val()
        const sentAt = new Date();
        const time = Date.now()
        await set(ref(db, `users/${currentUser.displayName}/${currentFriend}/${Number(Object.keys(friendObj).slice(-1).pop()) + 1}`), {
            message: message,
            sentAt: `${sentAt.getHours()}:${sentAt.getMinutes()}:${sentAt.getSeconds()}`,
            time
        }).then(console.log('message sent'))
    }, {
        onlyOnce: true
    })






}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
