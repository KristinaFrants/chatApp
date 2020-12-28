import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_RIZ0eWxdQcB6IpJiZ1rsDFzM6ID83R0",
    authDomain: "watsup-clone-f4f91.firebaseapp.com",
    projectId: "watsup-clone-f4f91",
    storageBucket: "watsup-clone-f4f91.appspot.com",
    messagingSenderId: "573226163383",
    appId: "1:573226163383:web:2cc8b1e24ed985fe10c132",
    measurementId: "G-JBYV9M6FT7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;