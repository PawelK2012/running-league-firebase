import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRunsForSingleUserComponent } from './all-runs-for-single-user.component';

describe('AllRunsForSingleUserComponent', () => {
  let component: AllRunsForSingleUserComponent;
  let fixture: ComponentFixture<AllRunsForSingleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRunsForSingleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRunsForSingleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
