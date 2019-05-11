import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;
  private userToBeViewed: any = null;

  constructor(public afs: AngularFirestore) {
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
    user.points = 0;
    user.totalDistance = 0;
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
    this.afs.doc(`users/${user.id}`).update({
      points: user.points + Math.floor(this.roundDownPointsToo100(distance)),
      totalDistance: user.totalDistance + distance
    });
  }

  extractUserPoints(run) {
    const userData = this.getUserById(run.user.id);
    userData.then(resol =>
        this.afs.doc(`users/${run.user.id}`).update({
        points: resol['points'] - Math.floor(this.roundDownPointsToo100(run.distance)),
        totalDistance: resol['totalDistance'] - run.distance
      })
    );
  }

  roundDownPointsToo100(distance) {
    if (distance > 100) {
      return distance = 100;
    } else {
      return distance;
    }
  }

  setUserToView(data) {
    this.userToBeViewed = data;
  }

  getUserToView() {
    return this.userToBeViewed;
  }

  // getUserById(userId) {
  //   this.afs.doc(`users/${userId}`).ref.get().then(function(doc) {
  //     if (doc.exists) {
  //       // console.log('Document data:', doc.data());
  //       // const data = doc.data();
  //       // console.log(data.points);
  //      return doc.data();
  //     } else {
  //       console.log('No such document!');
  //     }
  //   }).catch(function(error) {
  //     console.log('Error getting document:', error);
  //   });
  // }

  getUserById(userId) {
    return new Promise((resolve, reject) => {
      this.afs.doc(`users/${userId}`).ref.get().then(function (doc) {
        if (doc.exists) {
          resolve(doc.data());
        }});
    });
  }
}
