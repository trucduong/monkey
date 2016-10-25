import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { CommonUtils } from '../utils/common.utils';
 
@Injectable()
export class BaseHttpService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }

    public get(service: string, action: string, params: string[]) {
        let url = service + action;
        return this.http
        .get(CommonUtils.formatStr(url, params))
        .toPromise()
        .then(response => {
            let json = response.json();
            if (this.isSuccess(json)) {
                return Promise.resolve(JSON.parse(json.value));
            }
            return Promise.reject(json.value);
        })
        .catch(this.handleError);
    }

    public post(service: string, action: string, data: any, params: string[]) {
        let url = service + action;
        return this.http
            .post(CommonUtils.formatStr(url, params), JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .then(response => {
                let json = response.json();
                if (this.isSuccess(json)) {
                    return Promise.resolve(JSON.parse(json.value));
                }
                return Promise.reject(json.value);
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    

    private isSuccess(json: any): boolean {
        return json && json.type && json.type == 'success';
    }
}