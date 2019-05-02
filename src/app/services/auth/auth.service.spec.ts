import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MockAngularFireauth } from '../../../test/mock-angular-fireauth';
import { MockAngularFirestore } from '../../../test/mock-angular-firestore';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFireAuth, useClass: MockAngularFireauth },
      { provide: AngularFirestore, useClass: MockAngularFirestore }
    ],
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
