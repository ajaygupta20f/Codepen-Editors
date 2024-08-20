import { getApp ,getApps, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDZitkKa3H2ce6NV1rkxcNDoIUFop6UAsI",
  authDomain: "codeeditor-clone.firebaseapp.com",
  projectId: "codeeditor-clone",
  storageBucket: "codeeditor-clone.appspot.com",
  messagingSenderId: "400423728701",
  appId: "1:400423728701:web:b87370d6563c17ab05dc54"
};
  
  const app = getApps.length>0 ? getApp(): initializeApp(firebaseConfig)

  const auth =getAuth(app);

  const db=getFirestore(app);

  export {app,auth,db}