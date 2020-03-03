import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../shared/Globals';
import { Config } from '../config';
import 'rxjs/Rx';
import 'rxjs/add/operator/filter/';
import { Router, RouterModule } from '@angular/router';

@Injectable()
export class ControlService {

    constructor(private http: Http, public router: Router, public globals: Globals,) {

    }

    public getObject(url,id: number) {
        /*var token = this.globals.getToken();
        if (token !== "") {
            var header = new Headers();
            var authorization = 'bearer ' + token;
            header.append("Authorization", authorization);
            return this.http.get(Config.API_ENDPOINT + url +'?id=' + id, { headers: header })
                .map((res) => res.json());
        } else {
            this.router.navigate(['/logout']);
        }*/
    }
    public findWithParams(url: string, params: any[]) {
        /*var token = this.globals.getToken();
        if (token !== "") {
            var header = new Headers();
            var authorization = 'bearer ' + token;
            header.append("Authorization", authorization);
            var param = '';
            for (var i = 0; i < params.length; i++) {
                if (i === 0) {
                    param = '?param=' + params[i];
                } else {
                    param = param + '&param'+i+'=' + params[i];
                }
            }
            return this.http.get(Config.API_ENDPOINT + url + param, { headers: header })
                .map((res) => res.json());
        } else {
            this.router.navigate(['/logout']);
        }*/
    }

    public getList(url: string) {
        const header = new Headers();
        var token = this.globals.getToken();
        header.append('Content-Type', 'application/json');
        
        if (token !== "") {
            var authorization = token;
            header.append("Authorization", authorization);
        }
        return this.http.get(Config.API_ENDPOINT + url, { headers: header })
          .map((res) => res.json());
    }

    public find(url: string, param: any) {
            const header = new Headers();
            return this.http.get(Config.API_ENDPOINT + url + '/' + param, { headers: header })
                .map((res) => res.json());
    }

    public createRegister(register: any, url: string) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('X-Requested-With', 'application/xml');
        return this.http.post(Config.API_ENDPOINT + url, register, { headers: header })
          .map((res) => res.json());
    }

    public createMovie(register: any, url: string) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('X-Requested-With', 'application/xml');
      return this.http.post(Config.API_ENDPOINT + url, register, { headers: header })
        .map((res) => res.json());
  }

    public login(register: any, url: string) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(Config.API_ENDPOINT + url, register, { headers: header })
          .map((res) => res.json());
    }

    /*public createMultipleRegisters(registers: any[], url: string) {
      var token = this.globals.getToken();
      if (token !== "") {
        var header = new Headers();
        var authorization = 'bearer ' + token;
        header.append("Authorization", authorization);
        return this.http.post(Config.API_ENDPOINT + url, registers, { headers: header })
          .map((res) => res.json());
      } else {
        this.router.navigate(['/logout']);
      }
    }*/
    /*public updateRegister(id: number, register: any, url: string) {
        var token = this.globals.getToken();
        if (token !== "") {
            var header = new Headers();
            var authorization = 'bearer ' + token;
            header.append("Authorization", authorization);
            return this.http.put(Config.API_ENDPOINT + url+'/' + id, register, { headers: header })
                .map((res) => res.json());
        } else {
            this.router.navigate(['/logout']);
        }
    }*/
}

