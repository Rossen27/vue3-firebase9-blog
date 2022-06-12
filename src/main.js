import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import './assets/tailwind.css'
// loading component globalize
import LoadingComponent from "../src/components/LoadingComponent.vue";

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDePDusOpQqjt15O-9FmzLT58t3c-Y6dhg",
  authDomain: "vue3-firebase9-blog-45c59.firebaseapp.com",
  databaseURL: "https://vue3-firebase9-blog-45c59-default-rtdb.firebaseio.com",
  projectId: "vue3-firebase9-blog-45c59",
  storageBucket: "vue3-firebase9-blog-45c59.appspot.com",
  messagingSenderId: "450269643625",
  appId: "1:450269643625:web:4132182bfc55be4f79b3f8",
  measurementId: "G-3Z7YJJN7T0"
};
firebase.initializeApp(firebaseConfig)
var storage = firebase.storage();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, storage };

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
      const usuarioActivo ={
        email: user.email,
        uid: user.uid
      }
    store.dispatch('detectarUsuario', usuarioActivo)
    console.log(usuarioActivo)
    // ...
  } else {
    console.log(user)
    store.dispatch('detectarUsuario', user)
    // User is signed out
    // ...
  } 
});



createApp(App).use(router).use(store).component('LoadingComponent', LoadingComponent).mount('#app')
