import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfigHelper } from '../app/config/helpers/api-config.helper';
import { Thread } from '../models/thread';

@Injectable()
export class ThreadService {

  constructor(public _http: HttpClient) {
  }

  list(contact_id: any = null): Observable<Object> {
    let array = {};
    if (contact_id) {
      array['contact_id'] = contact_id;
    }
    return this._http.get(ApiConfigHelper.getListThreadURL(), {params: array});
  }

  threadById(thread_id: any ): Observable<Object> {
    return this._http.get(ApiConfigHelper.getThreadURL(thread_id));
  }

  storeThread(thread: Thread): Observable<Object> {
    const params = this.buildParams(thread);
    return this._http.post(ApiConfigHelper.storeThreadURL(), params);
  }

  updateThread(thread: Thread): Observable<Object> {
    const params = this.buildParams(thread);
    return this._http.post(ApiConfigHelper.updateThreadURL(thread.id), params);
  }

  deleteThread(thread_id: any): Observable<Object> {
    return this._http.delete(ApiConfigHelper.deleteThreadURL(thread_id));
  }

  private buildParams(thread: Thread): any {
    const params = {
      id: thread.id,
      name: thread.name,
      description: thread.description,
      status: thread.status,
      interest: thread.interest,
      source: thread.source,
      created_at: thread.created_at,
      updated_at: thread.updated_at,
      contact_id: thread.contact_id
    };
    return params;
  }
}
