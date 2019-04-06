import {
  MatTableModule,
  MatSortModule,
  MatButtonModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
