import { Injectable } from '@angular/core';
@Injectable()
export class Config {

    //public static get API_ENDPOINT(): string { return 'http://192.168.156.132:4000/'; }
    public static get API_ENDPOINT_MAIN(): string { return 'http://192.168.0.7:4000/'; }
    public static get API_ENDPOINT(): string { return 'http://192.168.0.7:4000/'; }
    
}

