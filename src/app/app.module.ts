import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

import { TableDataService } from './services/table/table-data.service';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'add-result', component: AddResultComponent },
  { path: 'league-table', component: LeagueTableComponent },
  { path: '', redirectTo: '/league-table', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    AddResultComponent,
    PageNotFoundComponent,
    LeagueTableComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'running-league-firebase'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [TableDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
