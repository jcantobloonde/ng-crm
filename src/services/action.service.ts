import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfigHelper } from '../app/config/helpers/api-config.helper';
import { Action } from '../models/action';

@Injectable()
export class ActionService {

  constructor(public _http: HttpClient) {
  }

  actionList(thread_id: any): Observable<Object> {
    let array = {};
      array['thread_id'] = thread_id;
    return this._http.get(ApiConfigHelper.getListActionURL(), {params: array});
  }

  getActionById(action_id: any): Observable<Object> {
    return this._http.get(ApiConfigHelper.getActionURL(action_id));
  }

  storeAction(action: Action): Observable<Object> {
    const params = this.buildParams(action);
    return this._http.post(ApiConfigHelper.storeActionURL(), params);
  }

  updateAction(action: Action): Observable<Object> {
    const params = this.buildParams(action);
    return this._http.post(ApiConfigHelper.updateActionURL(action.id), params);
  }

  deleteAction(action_id: any): Observable<Object> {
    return this._http.delete(ApiConfigHelper.deleteActionURL(action_id));
  }

  private buildParams(action: Action): any {
    const params = {
      id: action.id,
      name: action.name,
      description: action.description,
      result: action.result,
      issue: action.issue,
      observations: action.observations,
      nextDate: action.nextDate,
      created_at: action.created_at,
      updated_at: action.updated_at,
      type_id: action.type_id,
      thread_id: action.thread_id
    };
    return params;
  }
}
