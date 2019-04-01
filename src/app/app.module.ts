import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AddResultComponent } from './admin/add-result/add-result.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LeagueTableComponent } from './league/league-table/league-table.component';

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
    LeagueTableComponent,
    RouterModule
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
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
