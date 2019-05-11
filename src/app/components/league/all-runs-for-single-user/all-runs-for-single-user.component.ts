import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Run } from '../../../models/Run';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-all-runs-for-single-user',
  templateUrl: './all-runs-for-single-user.component.html',
  styleUrls: ['./all-runs-for-single-user.component.scss']
})
export class AllRunsForSingleUserComponent implements OnInit {

  runsCollection: AngularFirestoreCollection<Run>;
  runs: Observable<Run[]>;
  private userData: any = null;
  userName: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private readonly afs: AngularFirestore,
    private userService: UserService) {
    this.userData = this.userService.getUserToView();
    this.userName = this.userData[1];
    this.runsCollection = afs.collection<Run>('runs', ref => ref.where('user.id', '==', this.userData[0]));
    this.runs = this.runsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Run;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() { }

}
