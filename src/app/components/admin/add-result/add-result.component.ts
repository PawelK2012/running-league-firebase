import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
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
    time: new FormControl(''),
    date: new FormControl(''),
  });
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  runsCollection: AngularFirestoreCollection<Run>;
  runs: Observable<Run[]>;
  run: Run = {
    id: '',
    runName: '',
    distance: '',
    time: '',
    date: '',
    user: []
  };
  numberOfRuns = 0;

  constructor(private tableDataService: TableDataService,
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

    this.runsCollection = afs.collection<Run>('runs', ref => ref.orderBy('date', 'desc'));
    this.runs = this.runsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Run;
        const id = a.payload.doc.id;
        this.numberOfRuns = this.numberOfRuns + 1;
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
    this.openSnackBar('Result added to data base', 'Close');
    this.tableDataService.addRun(this.addResultForm.value);
    this.addResultForm.reset();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  deleteRun(run: Run) {
    const response = confirm('Are you sure you want to delete this run?');
    if (response) {
      this.tableDataService.deleteRun(run);
    }
    return;
  }
}
