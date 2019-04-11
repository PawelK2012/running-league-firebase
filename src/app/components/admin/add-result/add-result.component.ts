import { Component, OnInit } from '@angular/core';
import { TableDataService } from '../../../services/table/table-data.service';
import { Item } from '../../../models/Items';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {

  users: User[];
  item: Item = {
    title: '',
    description: ''
  };


  constructor( private tableDataService: TableDataService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      // const str = JSON.stringify(items, null, 4);
      console.log('AddResultComponent:: ', users);
      this.users = users;
   });
  }

  onSubmit() {
    if (this.item.title !== '' && this.item.description !== '') {
      this.tableDataService.addResutls(this.item);
      this.item.title = '';
      this.item.description = '';
    }
  }


}
