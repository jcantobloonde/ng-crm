import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfigHelper } from '../app/config/helpers/api-config.helper';
import { Contact } from '../models/contact';

@Injectable()
export class ContactService {

  constructor(public _http: HttpClient) {
  }

  contactsCompanyList(company_id: any = null): Observable<Object> {
    let array = {};
    if (company_id) {
      array ['company_id'] = company_id;
    }
    return this._http.get(ApiConfigHelper.getListContactURL(), {params: array});
  }

  getContact(contact_id: any): Observable<Object> {
    return this._http.get(ApiConfigHelper.getContactURL(contact_id));
  }

  storeContactURL(contact: Contact): Observable<Object> {
    const params = this.buildParams(contact);
    return this._http.post(ApiConfigHelper.storeContactURL(), params);
  }

  updateContactURL(contact: Contact): Observable<Object> {
    const params = this.buildParams(contact);
    return this._http.post(ApiConfigHelper.updateContactURL(contact.id), params);
  }

  deleteContactUrl(contact_id: any): Observable<Object> {
    return this._http.delete(ApiConfigHelper.deleteContactURL(contact_id));
  }


  private buildParams(contact: Contact): any {
    const params = {
      id: contact.id,
      name: contact.name,
      surname: contact.surname,
      email: contact.email,
      role: contact.role,
      main_contact: contact.main_contact,
      created_at: contact.created_at,
      updated_at: contact.updated_at,
      company_id: contact.company_id
    };
    return params;
  }
}
