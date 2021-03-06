import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { CommonUtils } from '../utils/common.utils';
import {LocalStorageService} from './localstorage.service';

@Injectable()
export class BaseHttpService {
    private storageService: LocalStorageService;
    constructor(public http: Http) { 
        this.storageService = new LocalStorageService();
    }

    private getHeader(): Headers {
        let headers = new Headers({ 'Content-Type': 'application/json', 'T_AUTH_TOKEN':this.storageService.get('AUTH_TOKEN') });
        return headers;
    }

    public get(service: string, action: string, params: string[]) {
        console.log("GET");console.log(service);console.log(action);console.log(params);
        let url = service + action;
        return this.http
            .get(CommonUtils.formatStr(url, params), { headers: this.getHeader() })
            .toPromise()
            .then(response => {
                let json = response.json();
                if (this.isSuccess(json)) {
                    return Promise.resolve(JSON.parse(json.value));
                }
                return Promise.reject({ isCustom: true, error: json.value, description: json.description });
            })
            .catch(this.handleError);
    }

    public post(service: string, action: string, data: any, params: string[]) {
        console.log("POST");console.log(service);console.log(action);console.log(data);console.log(params);
        let url = service + action;
        return this.http
            .post(CommonUtils.formatStr(url, params), JSON.stringify(data), { headers: this.getHeader() })
            .toPromise()
            .then(response => {
                let json = response.json();
                if (this.isSuccess(json)) {
                    return Promise.resolve(JSON.parse(json.value));
                }
                return Promise.reject({ isCustom: true, error: json.value, description: json.description });
            })
            .catch(this.handleError);
    }

    // downloadfile(service: string, action: string, params: string[]) {
    //     // var downloadHeaders = new Headers();
    //     // downloadHeaders.append('responseType', 'arraybuffer');

    //     let url = service + action;
    //     return this.http
    //     .get(CommonUtils.formatStr(url, params))
    //     .toPromise()
    //     .then(response => {
    //         let blob = response['_body'];
    //         let type = response.headers.get('content-type');
    //         return Promise.resolve(new Blob([blob], { type: type}));
    //         // return Promise.resolve(response.body);
    //     })
    //     .catch(this.handleError);
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        if (error['isCustom']) {
            return Promise.reject({msg: error['error'], detail: error['description']});
        }
        return Promise.reject({msg: 'service.error.unknow'});
    }



    private isSuccess(json: any): boolean {
        return json && json.type && json.type == 'success';
    }
}