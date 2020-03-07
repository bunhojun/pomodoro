import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "**************************",
    authDomain: "*****************************",
    databaseURL: "*****************************",
    projectId: "*************************",
    storageBucket: "************************",
    messagingSenderId: "*********************",
    appId: "****************************"
  };

  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;