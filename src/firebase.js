import { Fireplace } from '@material-ui/icons';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDczHkNIZNJHmXOqtbj4Mvk1pK76oL86-I",
    authDomain: "whatsapp-mern-a1ec8.firebaseapp.com",
    databaseURL: "https://whatsapp-mern-a1ec8.firebaseio.com",
    projectId: "whatsapp-mern-a1ec8",
    storageBucket: "whatsapp-mern-a1ec8.appspot.com",
    messagingSenderId: "791096442971",
    appId: "1:791096442971:web:d1f8e7b653373a486dff7e",
    measurementId: "G-D0L5BYKKJK"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };