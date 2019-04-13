import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableDataService } from '../../../services/table/table-data.service';
import { Item } from '../../../models/Items';
import { User } from '../../../models/User';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  item: Item = {
    title: '',
    description: ''
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
    if (this.item.title !== '' && this.item.description !== '') {
      this.tableDataService.addResutls(this.item);
      this.item.title = '';
      this.item.description = '';
    }
  }
}
