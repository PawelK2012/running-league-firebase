import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  users: User[];
  user: User = {
    email: '',
    userName: '',
    roles: '',
    superAdmin: false,
    listOfRuns: []
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      // const str = JSON.stringify(items, null, 4);
      this.users = users;
   });
  }

  onSubmit() {
    if (this.user.userName !== '') {
      this.userService.addUser(this.user);
      this.user.userName = '';
    }
  }

  deleteUser(user) {
    console.log('delete USER');
    this.userService.deleteUser(user);
  }

}
