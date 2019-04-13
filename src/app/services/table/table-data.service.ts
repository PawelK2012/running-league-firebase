import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../../models/Items';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) {

    this.itemsCollection = afs.collection<Item>('items', ref => ref.orderBy('title', 'asc'));

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
    return this.items;
  }

  addResutls (item: Item) {
    this.itemsCollection.add(item);
  }

  deleteResult(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

//   getItems(): Observable<any[]> {
//     return Observable.of(this.items);
// }
}
