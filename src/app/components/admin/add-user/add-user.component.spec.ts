import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatDividerModule, MatListModule } from '@angular/material';
import { AddUserComponent } from './add-user.component';
import { MockAngularFirestore } from '../../../../test/mock-angular-firestore';
import { AngularFirestore } from '@angular/fire/firestore';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent ],
      providers: [
        { provide: AngularFirestore, useClass: MockAngularFirestore }
      ],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatDividerModule, MatListModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
