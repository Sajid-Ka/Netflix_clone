import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDvAQlzS0ZgjW8FGOLz298bDHbi8zuzofA",
  authDomain: "netflix-clone-78318.firebaseapp.com",
  projectId: "netflix-clone-78318",
  storageBucket: "netflix-clone-78318.firebasestorage.app",
  messagingSenderId: "827813028639",
  appId: "1:827813028639:web:34ca1c01f45817b07b062a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};