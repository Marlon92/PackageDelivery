import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {
	MatButtonModule,
	MatToolbarModule,
	MatCardModule,
	MatFormFieldModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

@NgModule({
imports: [
	CommonModule,
	MatToolbarModule,
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatSnackBarModule,
  MatSelectModule,
  MatMenuModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
	],
exports: [
	CommonModule,
	MatToolbarModule,
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatSnackBarModule,
  MatSelectModule,
  MatMenuModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
],
})
export class CustomMaterialModule { }
