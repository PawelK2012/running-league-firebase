import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
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
  addUserForm = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl(''),
  });

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
    private readonly afs: AngularFirestore,
    private snackBar: MatSnackBar) {

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
    try {
      this.userService.addUser(this.addUserForm.value);
      this.addUserForm.reset();
      this.openSnackBar('User added to data base', 'Close');
    } catch (error) {
      console.log(error);
      this.openSnackBar(error, 'Close');
    }
  }

  deleteUser(user) {
    const response = confirm('Are you sure you want to delete this user?');
    if (response) {
      this.userService.deleteUser(user);
    }
    return;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}

