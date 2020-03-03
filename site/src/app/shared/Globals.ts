import { Injectable, ViewChild, Output, EventEmitter  } from '@angular/core'
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class Globals {
    public btnLoginShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public btnLogout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public usernameShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    //public showMenuMedia: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    @Output()
    public showBtnLoginLogout: EventEmitter<any>;
    public showUsername: EventEmitter<any>;

    public setBtnLoginShow(BtnLoginShow: boolean) {
        this.btnLoginShow.next(BtnLoginShow);
    }
    public setBtnLogout(BtnLoginShow: boolean) {
        this.btnLogout.next(BtnLoginShow);
    }
    public setUsernameShow(UsernameShow: boolean) {
      this.usernameShow.next(UsernameShow);
  }

    public getBtnLoginShow(): boolean {
        return this.btnLoginShow.value;
    }
    public getUsernameShow(): boolean {
      return this.usernameShow.value;
    }
    public refreshOptionSession() {
        var session = localStorage.getItem("session");
        //console.log(session);

        if (session !== null && session!=="") {
            var val = JSON.parse(session);
            if (val.session) {
                this.showBtnLoginLogout.emit(false);
                this.showUsername.emit(true);
            } else {
                this.showBtnLoginLogout.emit(true);
                this.showUsername.emit(false);
            }
        } else {
            var sessionVal = { "username": "", "session": false };
            localStorage.setItem("session", JSON.stringify(sessionVal));
            localStorage.setItem("token", "");
            this.showBtnLoginLogout.emit(true);
            this.showUsername.emit(false);
        }
    }
    public getBtnLogout(): boolean {
        return this.btnLogout.value;
    }

    public getToken():string {
        var session = localStorage.getItem("session");
        var token = localStorage.getItem("token");
        var me = this;
        if ((session !== null && session !== "") && (token !== null && token !== "")) {
            var val = JSON.parse(session);
            var tok = JSON.parse(token);
            if (val.session) {
                return tok;
            } else {
                return "";
            }
        } else {
            return "";
        }
    }
    public isLoggin(): boolean {
        var session = localStorage.getItem("session");
        var token = localStorage.getItem("token");
        var me = this;
        //console.log(session);
        //console.log(token);
        if ((session !== null && session !== "") && (token !== null && token !== "")) {
            var val = JSON.parse(session);
            var tok = JSON.parse(token);
            if (val.session===true) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

/*@Injectable()
export class Globals {
    public btnLoginShow: Observable<boolean>;

    constructor() {

    }
    public setBtnLoginShow(BtnLoginShow: boolean) {
        this.btnLoginShow = Observable.of(BtnLoginShow).share();
    }

    public getBtnLoginShow(): Observable<boolean> {
        return this.btnLoginShow;
    }
}*/

