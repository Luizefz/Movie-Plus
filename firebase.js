
import * as firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';
import { AppState } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOvgcjmi_mnby3MVfky4geKjO3YTAvpBA",
  authDomain: "moovie-plus.firebaseapp.com",
  projectId: "moovie-plus",
  storageBucket: "moovie-plus.appspot.com",
  messagingSenderId: "773328485472",
  appId: "1:773328485472:web:0e114410b6f5ce1b345705"
};

// Initialize Firebase
/*let app;

if (firebase.apps.lengh === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}*/ app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
export {db, auth};