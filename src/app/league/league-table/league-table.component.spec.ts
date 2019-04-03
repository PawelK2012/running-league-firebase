import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueTableComponent } from './league-table.component';
import { TableDataService } from '../../services/table/table-data.service';
import { MockTableDataService } from '../../../test/mock-table-data-service';

describe('LeagueTableComponent', () => {
  let component: LeagueTableComponent;
  let fixture: ComponentFixture<LeagueTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueTableComponent ],
      providers: [
        { provide: TableDataService, useClass: MockTableDataService }
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
