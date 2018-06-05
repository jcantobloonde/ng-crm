import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfigHelper } from '../app/config/helpers/api-config.helper';
import { Company } from '../models/company';

@Injectable()
export class CompanyService {

  constructor(public _http: HttpClient) {
  }

  companiesListOfModal(): Observable<Object> {
    return this._http.get(ApiConfigHelper.getListCompanyURL());
  }

  companyModalName(company_id: any): Observable<Object> {
    return this._http.get(ApiConfigHelper.getCompanyURL(company_id));
  }

  storeCompany(company: Company): Observable<Object> {
    const params = this.buildParams(company);
    return this._http.post(ApiConfigHelper.storeCompanyURL(), params);
  }

  updateCompany(company: Company): Observable<Object> {
    const params = this.buildParams(company);
    return this._http.post(ApiConfigHelper.updateCompanyURL(company.id), params);
  }

  deleteCompany(company_id: any): Observable<Object> {
    return this._http.delete(ApiConfigHelper.deleteCompanyURL(company_id));
  }

  private buildParams(company: Company): any {
    const params = {
      id: company.id,
      name: company.name,
    };
    return params;
  }
}
