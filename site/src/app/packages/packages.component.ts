import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { ControlService } from '../services/control.service';
import { Globals } from '../shared/Globals';
import { TableComponent } from '../controls/table/table.component';
import { TableEditComponent } from '../controls/tableEdit/tableEdit.component';
import 'rxjs/Rx';
import 'rxjs/add/operator/filter/';
import 'rxjs/add/operator/map/';

@Component({
  selector: 'packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {

  @ViewChild('table')
  public table: TableEditComponent;

  public model: any;
  public packages: any[];

  public displayedColumns = ['customer', 'description', 'amount', 'truck','pilot','location', 'destination', 'receptionDate'];
  public columnsContainer = [

    { columnDef: '_id', header: 'id', cell: (row: Element) => `${row._id}`, type: 'label'},
    { columnDef: 'customer', header: 'Customer', cell: (row: Element) => `${row.customer}`, type: 'label' },
    { columnDef: 'description', header: 'Description', cell: (row: Element) => `${row.description}`, type: 'label' },
    { columnDef: 'amount', header: 'Monto', cell: (row: Element) => `${row.amount}`, type: 'label'},
    { columnDef: 'location', header: 'Location', cell: (row: Element) => `${row.location}`, type: 'label' },
    { columnDef: 'destination', header: 'Destination', cell: (row: Element) => `${row.destination}`, type: 'label' },
    { columnDef: 'truck', header: 'Truck', cell: (row: Element) => `${row.truck}`, type: 'label' },
    { columnDef: 'pilot', header: 'Pilot', cell: (row: Element) => `${row.pilot}`, type: 'label' },
    { columnDef: 'receptionDate', header: 'Reception Date', cell: (row: Element) => `${row.receptionDate}`, type: 'date' },
  ];

  constructor(public controlService: ControlService, public globals: Globals, private router: Router, private http: Http) {
    if (!this.globals.isLoggin()) {
      this.router.navigate(['/login']);
    }
    this.model = {'name': '', 'email': '', 'password': '', 'password_confirmation': ''};
  }

  ngOnInit() {

    this.table.setColumnsContainer(this.columnsContainer);
    this.table.setDisplayedColumns(this.displayedColumns);

    this.controlService.getList('api/package')
       .subscribe((res) => {
         this.packages = res;
         var array = [];
         for (var x = 0; x < res.length; x++){
          var truckName = res[x].truck_id.brand + " " + res[x].truck_id.truckRegistration;
          var pilotName = res[x].truck_id.pilot_id.name;
          var json = {_id: res[x]._id, customer: res[x].customer, description: res[x].description, amount: res[x].amount,
          location: res[x].location, destination: res[x].destination, truck: truckName, pilot: pilotName, receptionDate: res[x].receptionDate
          }
          array.push(json);
         }
         this.table.initDatasource();
         this.table.dataSource.setData(array);
       });
      }

   public openMovie(item) {
      this.router.navigate(['api/packageAll/' + item.slug]);
   }
}

export interface Element {
  _id: boolean;
  customer: number;
  description: string;
  amount: string;
  location: string;
  destination: string;
  truck: string;
  receptionDate: Date;
  pilot: string;
}
