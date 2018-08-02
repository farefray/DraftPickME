import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Here we can split our configs by stages, to use separated accounts for development and prod.
var config = {
  apiKey: "AIzaSyBxQ0qTaO-fwc1iFz9GAFKsS2t2BMwFfYY",
  authDomain: "draftpickit.firebaseapp.com",
  databaseURL: "https://draftpickit.firebaseio.com",
  projectId: "draftpickit",
  storageBucket: "draftpickit.appspot.com",
  messagingSenderId: "482319420058"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
  db,
  auth,
  storage
}
