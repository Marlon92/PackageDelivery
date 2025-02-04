import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { ControlService } from '../services/control.service';
import 'rxjs/Rx'
import 'rxjs/add/operator/filter/'
import 'rxjs/add/operator/map/'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  public model: any;

  constructor(public controlService: ControlService, private router : Router, public snackBar: MatSnackBar, private http: Http) {
  	this.model = {'name': '', 'email': '', 'password': '', 'password_confirmation': ''};
  }

  ngOnInit() {
  }

  public signup() {
    this.model.password_confirmation = this.model.password;
    this.controlService.createRegister(this.model,"signup")
        .subscribe((res) => {
          this.snackBar.open('WELCOME', 'Close', {
            duration: 5000,
          });
            this.router.navigate(['/login']);
        });
  }

}
