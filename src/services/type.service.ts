import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfigHelper } from '../app/config/helpers/api-config.helper';
import { Type } from '../models/type';

@Injectable()
export class TypeService {

  constructor(public _http: HttpClient) {
  }

  list(): Observable<Object> {
    return this._http.get(ApiConfigHelper.getListTypeURL());
  }
}
