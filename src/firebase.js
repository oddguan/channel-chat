import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage"; // media files

var config = {
  apiKey: "AIzaSyCDixGhs16EVQe0l7VDIvlQlOAR6Ff3cc0",
  authDomain: "slack-clone-33fd9.firebaseapp.com",
  databaseURL: "https://slack-clone-33fd9.firebaseio.com",
  projectId: "slack-clone-33fd9",
  storageBucket: "slack-clone-33fd9.appspot.com",
  messagingSenderId: "817881330791"
};
firebase.initializeApp(config);

export default firebase;
