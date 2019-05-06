import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Run } from '../../models/Run';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  runsCollection: AngularFirestoreCollection<Run>;
  runs: Observable<Run[]>;
  runDoc: AngularFirestoreDocument<Run>;

  constructor(public afs: AngularFirestore,
              public userService: UserService) {
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
    this.userService.updateUsetPoints(run.distance, run.user);
    this.runsCollection.add(run);
  }

  deleteRun(run: Run) {
    this.runDoc = this.afs.doc(`runs/${run.id}`);
    this.runDoc.delete();
    this.userService.extractUserPoints(run);
  }

//   getItems(): Observable<any[]> {
//     return Observable.of(this.items);
// }
}
