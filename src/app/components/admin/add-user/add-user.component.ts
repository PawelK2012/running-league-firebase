import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  user: User = {
    email: '',
    userName: '',
    roles: '',
    superAdmin: false,
    listOfRuns: []
  };

  constructor(private userService: UserService,
    private readonly afs: AngularFirestore) {

    this.usersCollection = afs.collection<User>('users', ref => ref.orderBy('userName', 'asc'));

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() { }

  onSubmit() {
    if (this.user.userName !== '') {
      // to create id use:: doc(myId).set({})
      this.userService.addUser(this.user);
      this.user.userName = '';
      this.user.email = '';
    }
  }

  deleteUser(user) {
    const response = confirm('Are you sure you want to delete this user?');
    if (response) {
      this.userService.deleteUser(user);
    }
    return;
  }

}
