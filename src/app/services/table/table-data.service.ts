import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { Item } from '../../models/Items';
import { Run } from '../../models/Run';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  runsCollection: AngularFirestoreCollection<Run>;
  runs: Observable<Run[]>;
  run: AngularFirestoreDocument<Run>;

  constructor(public afs: AngularFirestore) {

    // this.itemsCollection = afs.collection<Item>('items', ref => ref.orderBy('title', 'asc'));
    this.runsCollection = afs.collection<Run>('runs', ref => ref.orderBy('userName', 'asc'));

    // this.items = this.itemsCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as Item;
    //     const id = a.payload.doc.id;
    //     console.log(id);
    //     return { id, ...data };
    //   }))
    // );
  }

  getItems() {
    // return this.items;
  }

  addRun (run: Run) {
    console.log(run);
    this.runsCollection.add(run);
  }

  deleteRun(run: Run) {
    // this.itemDoc = this.afs.doc(`items/${item.id}`);
    // this.itemDoc.delete();
  }

//   getItems(): Observable<any[]> {
//     return Observable.of(this.items);
// }
}
