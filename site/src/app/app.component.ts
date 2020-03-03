import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Globals } from './shared/Globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public showBtnLoginLogout = true;
  public showUsername = false;
  public username = '';
  public selected = '';
  constructor(private router: Router, private route: ActivatedRoute, public globals: Globals) {
  }

  ngOnInit() {
    var me = this;
    this.selected = 'user';
    this.globals.showUsername = new EventEmitter<any>();
    this.globals.showUsername.subscribe(e => {
      if (e) {
        const session = localStorage.getItem("session");
        const val = JSON.parse(session);
        this.username = val.user.name;
      }
      setTimeout(function() {
        me.showUsername = e;
      }, 200);
    });
    this.globals.showBtnLoginLogout = new EventEmitter<any>();
    this.globals.showBtnLoginLogout.subscribe(e => {
      setTimeout(function () {
        me.showBtnLoginLogout = e;
      }, 200);
    });
    this.globals.refreshOptionSession();

    /*if (this.globals.isLoggin()) {
       this.router.navigate(['/films']);
    }*/
  }

  public onNavigate($event) {
    this.selected = 'user';
    if ($event === 'add') {
      this.router.navigate(['/films/create']);
    }
  }

  public redirectMain() {
    //this.globals.refreshOptionSession();
    //this.router.navigate(['/login']);
    if (this.globals.isLoggin()) {
        this.router.navigate(['/login']);
    }
  }
}
