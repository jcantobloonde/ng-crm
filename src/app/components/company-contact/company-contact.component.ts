import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';
import {ContactService} from '../../../services/contact.service';
import {Contact} from '../../../models/contact';
import {ModalCompanyContactsComponent} from '../modal-company-contacts/modal-company-contacts.component';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.css']
})
export class CompanyContactComponent implements OnInit {
  @ViewChild(ModalCompanyContactsComponent) modalCompanyContactsComponent;
  public contact_id: any;
  public company_id: any;
  public mode: string;
  public showCreateContactAlert: string;
  public contact_options: {} = {contacts: []};
  public contact: Contact[];
  public company_options: {} = {companies: []};
  public company: Company[];
  @Output() success: EventEmitter<string> = new EventEmitter();
  constructor(private companyService: CompanyService, private contactService: ContactService) {
    this.mode = 'create';
    this.showCreateContactAlert = 'invisible';
  }
  ngOnInit() {
    this.companiesModalList();
  }

  companiesModalList(): void {
    this.companyService.companiesListOfModal()
      .subscribe(
        res => {
          this.company = <Company[]> res['companies'];
          this.prepareOptionsCompaniesModalList();
        },
        error => {
          window.alert('Error');
        }
      );
  }

  private prepareOptionsCompaniesModalList(): void {
    this.company_options['companies'] = [];
    for (let i = 0; i < this.company.length; i++) {
      let company = this.company[i];
      this.company_options['companies'].push({id: company.id, name: company.name});
    }
  }

  contactsOfCompanyList(company_id): void {
    this.company_id = company_id;
    this.contactService.contactsCompanyList(this.company_id)
      .subscribe(
        res => {
          this.contact = <Contact[]> res['contacts'];
          this.prepareOptionsContactsCompany();
        },
        error => {
          window.alert('Error');
        }
      );
  }

  private prepareOptionsContactsCompany(): void {
    this.contact_options['contacts'] = [];
    for (let i = 0; i < this.contact.length; i++) {
      let contact = this.contact[i];
      this.contact_options['contacts'].push({id: contact.id, name: contact.name, surname: contact.surname, email: contact.email,
        role: contact.role, main_contact: contact.main_contact, created_at: contact.created_at, updated_at: contact.updated_at,
        company_id: contact.company_id});
    }
  }

  companyNameContactCompanyModal(company_id): void {
    this.company_id = company_id;
    this.companyService.companyModalName(this.company_id)
      .subscribe(
        res => {
          this.company = <Company[]> res['companies'];
        },
        error => {
          window.alert('Error');
        }
      );
  }

  deleteContact(): void {
    this.contactService.deleteContactUrl(this.contact_id)
      .subscribe(
        res => {
          this.contact = <Contact[]> res['contacts'];
          this.onSuccess('deleteContact');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  showDeleteModal(contact_id): void {
    this.contact_id = contact_id;
    $('#modalDeleteContact').modal('show');
  }
  modalConfirmDelete(): void {
    this.modalClose();
    this.deleteContact();
  }
  modalClose(): void {
    $('#modalDeleteContact').modal('hide');
  }

  changeMode(mode) {
    this.mode = mode;
  }

  private onSuccess(changeSuccess): void {
    this.success.emit(changeSuccess);
  }

  getContactById(contact_id, mode) {
    this.mode = mode;
    this.contact_id = contact_id;
    this.modalCompanyContactsComponent.getContactModal(this.contact_id);
    this.modalCompanyContactsComponent.changeMode(this.mode);
    this.modalCompanyContactsComponent.showCompanyContactsModal();
  }

  showCreateModal(mode, company_id) {
    this.mode = mode;
    this.company_id = company_id;
    this.modalCompanyContactsComponent.showCompanyContactsModal();
    this.modalCompanyContactsComponent.resetFormContact(this.mode, this.company_id);
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
}
