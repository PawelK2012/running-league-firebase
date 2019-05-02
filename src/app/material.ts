import {
  MatTableModule,
  MatSortModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDividerModule,
  MatListModule,
  MatIconModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class MaterialModule {}
