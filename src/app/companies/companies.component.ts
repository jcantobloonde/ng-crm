import {Component, OnInit, ViewChild} from '@angular/core';
import { CompanyService } from '../../services/company.service';
import {CompanyContactComponent} from '../components/company-contact/company-contact.component';
import {Company} from '../../models/company';
import {ModalCompaniesComponent} from "../components/modal-companies/modal-companies.component";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  @ViewChild(CompanyContactComponent) companyContactComponent;
  @ViewChild(ModalCompaniesComponent) modalCompaniesComponent;
  public company_id: any;
  public mode: string;
  public company_options: {} = {companies: []};
  public companies: Company[];
  public showCreateContactAlert: string;
  constructor(private companyService: CompanyService) {
    this.mode = 'create';
    this.showCreateContactAlert = 'invisible';
  }
  ngOnInit() {
    this.companiesList();
  }

  companiesList(): void {
    this.companyService.companiesListOfModal()
      .subscribe(
        res => {
          this.companies = <Company[]> res['companies'];
          this.prepareOptions();
        },
        error => {
          window.alert('Error');
        }
      );
  }

  private prepareOptions(): void {
    this.company_options['companies'] = [];
    for (let i = 0; i < this.companies.length; i++) {
      let company = this.companies[i];
      this.company_options['companies'].push({id: company.id, name: company.name});
    }
  }

  companyContactsList(): void {
    this.companyContactComponent.contactsOfCompanyList(this.company_id);
    this.contactCompanyList();
  }

  contactCompanyList(): void {
    this.companyContactComponent.companyNameContactCompanyModal(this.company_id);
  }

  changeAlert(changeSuccess): void {
    this.showCreateContactAlert = changeSuccess;
    for (let incremento = 0; incremento <= 20; incremento++) {
      if (incremento === 20) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  }

  addCompany(mode) {
    this.mode = mode;
    this.modalCompaniesComponent.showCompanyModal();
    this.modalCompaniesComponent.changeMode(this.mode);
    this.modalCompaniesComponent.addCompanyModal(this.mode);
  }

  showModalCompany(company_id, mode): void {
    this.mode = mode;
    this.company_id = company_id;
    this.modalCompaniesComponent.showCompanyModal(this.company_id, this.mode);
    this.modalCompaniesComponent.companyNameModal(this.company_id);
    this.modalCompaniesComponent.changeMode(this.mode);
  }
}
