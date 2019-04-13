import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableDataService } from '../../../services/table/table-data.service';
import { Item } from '../../../models/Items';
import { MatTableModule, MatSortModule, MatSort } from '@angular/material';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 12, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 15, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 22, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 25, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss']
})
export class LeagueTableComponent implements OnInit {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tableDataService: TableDataService,
    private readonly afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<Item>('items', ref =>
      ref.orderBy('title', 'asc')
    );

    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          console.log(id);
          return { id, ...data };
        })
      )
    );
  }

  ngOnInit() { }

  deleteResult(item) {
    console.log('delete result');
    this.tableDataService.deleteResult(item);
  }
}

// export class TableStickyHeaderExample {
//   displayedColumns = ['position', 'name', 'weight', 'symbol'];
//   dataSource = ELEMENT_DATA;
// }

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
