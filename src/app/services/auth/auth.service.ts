import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // this.user$ = this.afAuth.authState.switchMap(user => {
    //   if (user) {
    //     return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //   } else {
    //     // return Observable.of(null);
    //     return of(null);
    //   }
    // });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      // update user documen in firestore
      this.updateUserData(credential.user);
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  public updateUserData(user) {
    // old ref `users/${user.user.uid}`
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.user.uid}`
    );
    const data: User = {
      // id: user.user.uid,
      email: user.user.email,
      roles: 'subscriber'
      // roles: {
      //   // subscriber: true
      //   subscriber: true
      // }
    };
    return userRef.set(data, { merge: true });
  }

  // canRead(user: User): boolean {
  //   const allowed = ['admin', 'editor', 'subscriber'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // canEdit(user: User): boolean {
  //   const allowed = ['admin', 'editor'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // canDelete(user: User): boolean {
  //   const allowed = ['admin'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // private checkAuthorization(user: User, allowedRoles: string[]): boolean {
  //   if (!user) {return false; }
  //   for (const role of allowedRoles) {
  //     if (user.roles[role]) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}
