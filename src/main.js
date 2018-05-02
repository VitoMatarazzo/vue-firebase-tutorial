// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from "firebase"
require("firebase/firestore");

Vue.config.productionTip = false

let app;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC89NUp50FuuT2wVn_XScNi_B55EPuRbq0",
    authDomain: "vue-firebase-tutorial-82f1d.firebaseapp.com",
    databaseURL: "https://vue-firebase-tutorial-82f1d.firebaseio.com",
    projectId: "vue-firebase-tutorial-82f1d",
    storageBucket: "",
    messagingSenderId: "868664575451"
};

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
    if(!app) {
        /* eslint-disable no-new */
        new Vue({
          el: '#app',
          router,
          components: { App },
          template: '<App/>'
        })
    }
});

