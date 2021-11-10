import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyDse6ZPt7gf26QMB5eYKIFG2sMTw_JbI6o",
    authDomain: "applesell-c74ab.firebaseapp.com",
    databaseURL: "https://applesell-c74ab-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "applesell-c74ab",
    storageBucket: "applesell-c74ab.appspot.com",
    messagingSenderId: "196571874025",
    appId: "1:196571874025:web:115e4bafd3efc00d21e678",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export { app };
