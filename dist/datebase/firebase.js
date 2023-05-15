"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.db = void 0;
const { initializeApp } = require("firebase/app");
require("dotenv").config();
const { getFirestore } = require("firebase/firestore");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
console.log("firebase");
// Initialize Cloud Firestore and get a reference to the service
exports.db = getFirestore(firebase);
exports.storage = getStorage(firebase);
