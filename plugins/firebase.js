import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyCOO8iKX5QJ4CVDZWxYlemchGO1FlWrkgw",
        authDomain: "rinkimai-87143.firebaseapp.com",
        databaseURL: "https://rinkimai-87143.firebaseio.com",
        projectId: "rinkimai-87143",
        storageBucket: "rinkimai-87143.appspot.com",
        messagingSenderId: "957497678973",
        appId: "1:957497678973:web:3ad57ece5a95b107"
    }
    firebase.initializeApp(config)
}
const fireDb = firebase.firestore();
const storage = firebase.storage();
export {fireDb, storage}
