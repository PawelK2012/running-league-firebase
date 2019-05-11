import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss']
})
export class LeagueTableComponent implements OnInit {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  displayedColumns = ['position', 'name', 'points', 'totalDistance'];
  dataSource = this.users;
  isSpinnerOn = true;
  numberOfUsers = 0;

  constructor( private readonly afs: AngularFirestore,
    private router: Router,
    private userService: UserService) {

    this.usersCollection = afs.collection<User>('users', ref => ref.orderBy('points', 'desc'));

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        const position = a.payload.newIndex + 1;
        this.numberOfUsers = this.numberOfUsers + 1;
        return { id, position, ...data };
      }))
    );
  }

  ngOnInit() {
    this.dataSource = this.users;
  }

  setUserDetails(x, y) {
    this.router.navigate(['/view-user-runs']);
    this.userService.setUserToView([x, y]);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
