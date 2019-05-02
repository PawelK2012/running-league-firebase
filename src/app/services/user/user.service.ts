import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/User';
export interface UserId extends User { id: string; }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(public afs: AngularFirestore) {
    // we dont see all user because this.usersCollection filters by userName
    /// and user that come from auth service dont have userName
    this.usersCollection = afs.collection<User>('users', ref => ref.orderBy('userName', 'asc'));

    // this.users = this.usersCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as User;
    //     const id = a.payload.doc.id;
    //     console.log(id);
    //     return { id, ...data };
    //   }))
    // );
  }

  addUser (user: User) {
    this.usersCollection.add(user);
  }

  getUsers() {
    return this.users;
  }

  deleteUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }

  updateUsetPoints(distance, user) {
    this.afs.doc(`users/${user.id}`).update({points: user.points + distance});
  }
}
