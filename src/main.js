import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/firestore";
import './assets/tailwind.css'
// loading component globalize
import LoadingComponent from "@/components/LoadingComponent.vue";
// const store = store;

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
initializeApp(firebaseConfig);

// 讓資料可傳送至Firebase
const db = getFirestore();
const auth = getAuth()
const timestamp = serverTimestamp()
const blogsColRef = collection(db, "blogs");
// const videoColRef = collection(db, "video");
// const caseColRef = collection(db, "case");
// const publicationColRef = collection(db, "publication");
const fileStorage = getStorage();
export { timestamp, auth, fileStorage };
export default blogsColRef;

createApp(App).use(router).use(store).component('LoadingComponent', LoadingComponent).mount('#app')
