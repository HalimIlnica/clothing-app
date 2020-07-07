import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyCpnDDz8kGPL9Xm9PXWF-VnnppgWsYTp8o",
        authDomain: "crwn-db-1a08b.firebaseapp.com",
        databaseURL: "https://crwn-db-1a08b.firebaseio.com",
        projectId: "crwn-db-1a08b",
        storageBucket: "crwn-db-1a08b.appspot.com",
        messagingSenderId: "797066141219",
        appId: "1:797066141219:web:bc593e676612cba02b5b96",
        measurementId: "G-3L84CB0J5R"
      
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt
            })
        } catch(error){
            console.log('error creating user', error.message)

        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;