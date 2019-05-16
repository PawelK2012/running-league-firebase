import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AddResultComponent } from './components/admin/add-result/add-result.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LeagueTableComponent } from './components/league/league-table/league-table.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';

import { TableDataService } from './services/table/table-data.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { AllRunsForSingleUserComponent } from './components/league/all-runs-for-single-user/all-runs-for-single-user.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'add-result', component: AddResultComponent },
  { path: 'league-table', component: LeagueTableComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-user-runs', component: AllRunsForSingleUserComponent },
  { path: '', redirectTo: '/league-table', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    AddResultComponent,
    PageNotFoundComponent,
    LeagueTableComponent,
    NavBarComponent,
    AddUserComponent,
    AllRunsForSingleUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'running-league-firebase'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TableDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
