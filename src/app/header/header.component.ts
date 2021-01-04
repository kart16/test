import { Component, OnInit } from '@angular/core';
import { PrayerService } from '../Services/prayer.service';
import { Subscription } from 'rxjs';
import { Prayer } from '../models/prayer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  prayersSubscription: Subscription;
  prayer: any[];

  ModifForm: FormGroup;
  signInForm: FormGroup;
  resetForm: FormGroup;
  errorMessage: string;
  success: boolean;
  isAuth: boolean;
  curUser: object;
  userMail: string;

  constructor(private prayerService: PrayerService,
              private formbuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.prayersSubscription = this.prayerService.prayersSubject.subscribe(
        (prayers: Prayer[]) => {
          this.prayer = prayers;
      }
    );
    this.prayerService.getPrayers();

    this.initForm();

    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth=true;
          this.userMail = user.email;
          localStorage.setItem("email", user.email);
        }
        else{
          this.isAuth=false;
          //localStorage.setItem('user', null);
        }
      });

  }

  onFetchPrayer() {
    console.log("Click ok")
    this.prayerService.getPrayers();
  }

  ngOnDestroy() {
    this.prayersSubscription.unsubscribe();
  }

  initForm(){
    this.ModifForm = this.formbuilder.group({
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })

    this.resetForm= this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })

    this.signInForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }
  
/*   onSubmit() {
    const newPass = this.ModifForm.get('password').value;
    this.authService.updatePasswordInFirebase(newPass);
  } */

  onSubmited(){
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/adminPage']);
      },
      (error) => {
        this.errorMessage = error;
        alert(error);
      }
    );
  }

  onSignOut(){
    this.authService.signOutUser();
  }

  onDeletUserInFirebase(){
    this.authService.deleteUserInFireBase();
  }

  onResetAfterConnexion(){ 
    const email = firebase.auth().currentUser.email;
    this.sendPasswordResetEmail(email);
  }

  onReset(){ 
    const email = this.resetForm.get('email').value;
    this.sendPasswordResetEmail(email);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await firebase.auth().sendPasswordResetEmail(passwordResetEmail);
  }

}

