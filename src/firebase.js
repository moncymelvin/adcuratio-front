import * as firebase from "firebase";
 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCq6YGi_lzDFyBURXQXZx7QjOgCoORrYm4",
  authDomain: "ecommerce-mern-970f3.firebaseapp.com",
  databaseURL: "https://ecommerce-mern-970f3.firebaseio.com",
  projectId: "ecommerce-mern-970f3",
  storageBucket: "ecommerce-mern-970f3.appspot.com",
  messagingSenderId: "832353441719",
  appId: "1:832353441719:web:700ab1a93af4680eeaba32"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();