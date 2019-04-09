import { Component, OnInit } from '@angular/core';
import { TableDataService } from '../../../services/table/table-data.service';
import { Item } from '../../../models/Items';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {

  item: Item = {
    title: '',
    description: ''
  };

  constructor( private tableDataService: TableDataService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.item.title !== '' && this.item.description !== '') {
      this.tableDataService.addResutls(this.item);
      this.item.title = '';
      this.item.description = '';
    }
  }


}
