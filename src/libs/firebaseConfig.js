// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvpGg5N56UxlYQap7eBGL9goResSCzrJY",
  authDomain: "foodordering-6cddc.firebaseapp.com",
  projectId: "foodordering-6cddc",
  storageBucket: "foodordering-6cddc.appspot.com",
  messagingSenderId: "1048521269088",
  appId: "1:1048521269088:web:b8de8cb8311d345d468805",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
