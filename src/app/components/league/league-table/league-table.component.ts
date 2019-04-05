import { Component, OnInit } from '@angular/core';
import { TableDataService } from '../../../services/table/table-data.service';
import { Item } from '../../../models/Items';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit {

  items: Item[];

  constructor(private tableDataService: TableDataService) { }

  ngOnInit() {
    this.tableDataService.getItems().subscribe(items => {
       // const str = JSON.stringify(items, null, 4);
       console.log(items);
       this.items = items;
    });
  }

}
