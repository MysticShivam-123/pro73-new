import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBG33e2H6NYENQKqVS7QgO_9YONsPwxx9A",
  authDomain: "e-liabrary-d5aeb.firebaseapp.com",
  projectId: "e-liabrary-d5aeb",
  storageBucket: "e-liabrary-d5aeb.appspot.com",
  messagingSenderId: "359010992643",
  appId: "1:359010992643:web:3f9660ba344fb6b00a8436"
};


firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
