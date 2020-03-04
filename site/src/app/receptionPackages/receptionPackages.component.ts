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
  selector: 'receptionPackages',
  templateUrl: './receptionPackages.component.html',
  styleUrls: ['./receptionPackages.component.css']
})
export class ReceptionPackageComponent {
  myForm: FormGroup;
  public model: any;
  public dates: any;
  public trucks: any[] = [];
  public truck: any;
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
    this.model = { 'customer': '', 'description': '', 'amount': '', 'location': '',
                  'destination': '', 'truck': '', 'truck_id':'' };
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      'id': ['', Validators.required],
      'customer': ['', Validators.required],
      'description': ['', Validators.required],
      'amount': ['', Validators.required],
      'location': [null, Validators.required],
      'dstination': [null, Validators.required],
      'truck': ['', Validators.required]
    });

    this.controlService.getList('api/getAllTrucks')
      .subscribe((res) => {
        this.trucks = res;
        this.truck = this.trucks[0];
    });

    /*this.controlService.getList('genres')
      .subscribe((res) => {
        this.allGenres = res.records;
    });*/
  }
  public save() {
    this.activate = true;
    this.model.truck_id = this.truck._id;
    this.controlService.createRegister(this.model, 'api/package')
      .subscribe((res) => {
        this.activate = false;
        this.clean();
        this.snackBar.open('Package received', 'Close', {
          duration: 10000,
        });
      });
  }

  public clean() {
    this.model = { 'customer': '', 'description': '', 'amount': '', 'location': '',
                  'destination': '', 'truck': '', 'truck_id':'' };
  }
}
