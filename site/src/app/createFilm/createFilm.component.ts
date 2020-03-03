import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { ControlService } from '../services/control.service';
import { MatSnackBar, MatRadioButton, MatRadioGroup, MatDatepickerModule,
        MatDatepicker, MatDatepickerToggle, DateAdapter, MatAutocompleteSelectedEvent,
        MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { DatePipe } from '@angular/common';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import 'rxjs/add/operator/filter/';
import 'rxjs/add/operator/map/';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  providers: [DatePipe],
  selector: 'createFilm',
  templateUrl: './createFilm.component.html',
  styleUrls: ['./createFilm.component.css']
})
export class CreateFilmComponent {
  myForm: FormGroup;
  public model: any;
  public dates: any;
  public countries: any[] = [];
  public country: any;
  public files: UploadFile[] = [];
  public fileName = 'Upload a photo.';
  public fileNameSend = '';
  public dataFile: any;
  public activate = false;
  public myReader: FileReader =  new FileReader();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  genres: any[] = [];
  allGenres: any[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('picker')
  picker: ElementRef;
  @ViewChild('picker2')
  picker2: ElementRef;

  constructor(public controlService: ControlService, public fb: FormBuilder, public snackBar: MatSnackBar,
              public datePipe: DatePipe, private router: Router, private http: Http) {

    const date = new Date();
    this.model = { 'name': '', 'description': '', 'release_date': date, 'rating': '1',
                  'ticket_price': '', 'country_id': '', 'photo': '', 'slug': '' };

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => genre ? this._filter(genre) : this.allGenres.slice()));
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      'id': ['', Validators.required],
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'release_date': ['', Validators.required],
      'rating': [null, Validators.required],
      'ticket_price': [null, Validators.required],
      'country_id': ['', Validators.required],
      'photo': ['', Validators.required],
      'slug': ['', Validators.required]
    });

    this.controlService.getList('countries')
      .subscribe((res) => {
        this.countries = res.records;
        this.country = this.countries[0];
    });

    this.controlService.getList('genres')
      .subscribe((res) => {
        this.allGenres = res.records;
    });
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.genres.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(genre: string): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.genres.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: any): string[] {
    let filterValue = '';
    if (!value.description) {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.description.toLowerCase();
    }

    return this.allGenres.filter(genre => genre.description.toLowerCase().indexOf(filterValue) === 0);

  }
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.myReader.readAsDataURL(file);
          // Here you can access the real file
          this.fileName = droppedFile.relativePath;
          this.fileNameSend = droppedFile.relativePath;
          this.dataFile = file;
          console.log(droppedFile.relativePath, file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  public fileOver(event) {
    console.log(event);
  }
  public fileLeave(event) {
    console.log(event);
  }

  public onClick($event) {
    this.model.rating = $event.rating;
  }

  public save() {
    this.activate = true;
    this.model.country_id = this.country.id;
    this.model.photo = this.myReader.result;
    this.model.genres = this.genres;
    this.model.imgName = this.fileName;
    this.controlService.createRegister(this.model, 'films/create')
      .subscribe((res) => {
        this.activate = false;
        this.snackBar.open('Film correctly created', 'Close', {
          duration: 10000,
        });
      });
  }
}
