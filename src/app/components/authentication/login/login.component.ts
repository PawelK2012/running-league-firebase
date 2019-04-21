import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ui: firebaseui.auth.AuthUI;

  constructor(private afAuth: AngularFireAuth,
              public authService: AuthService) { }

  ngOnInit() {

    const uiConfig = {
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],

      callbacks: {
       signInSuccessWithAuthResult: this.onLoginSuccessful
        .bind(this)
      }
    };

    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    this.ui.start('.auth-container', uiConfig);
  }

  onLoginSuccessful(x) {
     console.log('success login', x);
     this.authService.updateUserData(x);
  }

}
