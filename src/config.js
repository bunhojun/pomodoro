import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD5z7iTh2QR82v-piuLbn_35AApnYHm3Ds",
    authDomain: "pomodoro-6923a.firebaseapp.com",
    databaseURL: "https://pomodoro-6923a.firebaseio.com",
    projectId: "pomodoro-6923a",
    storageBucket: "pomodoro-6923a.appspot.com",
    messagingSenderId: "309234706676",
    appId: "1:309234706676:web:2223cc48d4062713cfd6a1"
  };

  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;