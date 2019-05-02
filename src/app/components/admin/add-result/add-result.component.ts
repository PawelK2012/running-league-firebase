import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { TableDataService } from '../../../services/table/table-data.service';
import { Run } from '../../../models/Run';
import { User } from '../../../models/User';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {

  addResultForm = new FormGroup({
    user: new FormControl(''),
    runName: new FormControl(''),
    distance: new FormControl(''),
    time: new FormControl('')
  });
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  run: Run = {
    id: '',
    userId: '',
    userName: '',
    runName: '',
    distance: '',
    time: '',
    date: '',
  };

  constructor(private tableDataService: TableDataService,
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

  ngOnInit() {
    // Old way with subscribe() to service
    //   this.userService.getUsers().subscribe(users => {
    //     console.log('AddResultComponent:: ', users);
    //     this.users = users;
    //  });
  }

  onSubmit() {
    this.tableDataService.addRun(this.addResultForm.value);
    this.addResultForm.reset();
  }
}
