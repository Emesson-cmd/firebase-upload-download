import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

export const app = firebase.initializeApp({
    "projectId": "my-project-storage-firebase",
    "appId": "1:916429504737:web:31fe167c4bc21095dbb7a0",
    "storageBucket": "my-project-storage-firebase.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyA__AyJyJ3k6toLgFiv0o8NXNDz4a8XaCs",
    "authDomain": "my-project-storage-firebase.firebaseapp.com",
    "messagingSenderId": "916429504737"
});