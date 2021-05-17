import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
     // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBoLDC5gLfWn4dfdPhQbFo9WDhbPilx7GQ",
      authDomain: "site-stcamille.firebaseapp.com",
      databaseURL: "https://site-stcamille.firebaseio.com",
      projectId: "site-stcamille",
      storageBucket: "site-stcamille.appspot.com",
      messagingSenderId: "787790153187",
      appId: "1:787790153187:web:f17935a2b56fff94844cd6",
      measurementId: "G-PEKHPRQ3XZ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
