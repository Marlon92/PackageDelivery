import { Component,Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Globals } from '../shared/Globals';
@Component({    
    template: ''
})
export class LogoutComponent {

    /*@Output()
    showMenu: EventEmitter<any> = new EventEmitter<any>();*/

    constructor(public globals: Globals, private router: Router) {
        
    }
    ngOnInit() {
        localStorage.setItem("session", "");
        localStorage.setItem("token", "");
        this.globals.refreshOptionSession();
        this.router.navigate(['/login']);
        //this.globals.showMenu.emit(false);
    }
}
