import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { ControlService } from '../services/control.service';
import { Globals } from '../shared/Globals';
import { MatSnackBar } from '@angular/material';
import 'rxjs/Rx';
import 'rxjs/add/operator/filter/';
import 'rxjs/add/operator/map/';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public model: any;
  public activate = false;
  public showBtnLoginLogout = false;
  constructor(public controlService: ControlService, public snackBar: MatSnackBar, public globals: Globals,
              private router: Router, private http: Http) {

    if (this.globals.isLoggin()) {
      this.router.navigate(['/api/packages']);
    }

    this.model = { 'email': '', 'password': '', 'remember_me': false };
  }

  ngOnInit() {
  }

  public login() {
    this.activate = true;
    this.controlService.login(this.model,"login")
        .subscribe((res) => {
          this.activate = false;
          var session = { "user": res.userEmail, "session": true };
          var token = "Bearer " + res.token;
          localStorage.setItem("session", JSON.stringify(session));
          localStorage.setItem("token", JSON.stringify(token));
          this.router.navigate(['api/packages']);
          this.globals.refreshOptionSession();
        }, (error: any) => {
          const status = error.status;
          if (status === 401) {
            this.snackBar.open('Incorrect User or Password', 'Close', {
              duration: 5000,
            });
          }
        });
  }

}
