import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultComponent } from './add-result.component';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockAngularFirestore } from '../../../../test/mock-angular-firestore';

describe('AddResultComponent', () => {
  let component: AddResultComponent;
  let fixture: ComponentFixture<AddResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useClass: MockAngularFirestore }
      ],
      imports: [ FormsModule ],
      declarations: [ AddResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
