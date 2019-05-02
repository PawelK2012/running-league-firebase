import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueTableComponent } from './league-table.component';
import { TableDataService } from '../../../services/table/table-data.service';
import { MockTableDataService } from '../../../../test/mock-table-data-service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockAngularFirestore } from '../../../../test/mock-angular-firestore';
import { MatTableModule } from '@angular/material';

describe('LeagueTableComponent', () => {
  let component: LeagueTableComponent;
  let fixture: ComponentFixture<LeagueTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule ],
      declarations: [ LeagueTableComponent ],
      providers: [
        { provide: TableDataService, useClass: MockTableDataService },
        { provide: AngularFirestore, useClass: MockAngularFirestore }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
