import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCvlpYqbNVg8WF0riS-V9BY07PXVqKPGyg",
    authDomain: "wiztagram-88943.firebaseapp.com",
    databaseURL: "https://wiztagram-88943.firebaseio.com"
});

const base = Rebase.createClass(app.database());

export default base;