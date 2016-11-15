//Angular2 @LocalStorage
//https://github.com/marcj/angular2-localstorage
//https://www.npmjs.com/package/ng2-cookies

const LOCAL_STORAGE = {locale: 'vi'};

import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    constructor() { }

    public static get(key: string): any {
        return LOCAL_STORAGE[key];
    }

    public static set(key: string, value: any) {
        LOCAL_STORAGE[key] = value;
    }
}