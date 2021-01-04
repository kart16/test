import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  email: string;
  pwd: string;

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            this.email=email;
            this.pwd = password;
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

  deleteUserInFireBase(){
    var user = firebase.auth().currentUser;

    user.delete().then(function() {
      console.log("user deleted");
    }).catch(function(error) {
      console.log("user not deleted");
    });
  }

  /*updateEmailInFirebase(email: string){
    var user = firebase.auth().currentUser;
    user.updateEmail(email).then(function(){
      console.log("user email updated");
    }).catch(function(error){
      console.log("email not updated")
    })
  }*/

  updatePasswordInFirebase(newPass: string){
    var user = firebase.auth().currentUser;

    user.updatePassword(newPass).then(function(){
      console.log("user password updated");
    }).catch(function(error){
      console.log("password not updated")
    })
  }


}
