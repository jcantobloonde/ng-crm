import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Contact} from '../../../models/contact';
import {ContactService} from '../../../services/contact.service';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';

@Component({
  selector: 'app-modal-company-contacts',
  templateUrl: './modal-company-contacts.component.html',
  styleUrls: ['./modal-company-contacts.component.css']
})
export class ModalCompanyContactsComponent implements OnInit {
  public contact_id: any;
  public mode: string;
  public changeSuccess: string;
  public contact: Contact;
  public company: Company[];
  public company_options: {} = {companies: []};
  @Output() success: EventEmitter<string> = new EventEmitter();
  constructor(private contactService: ContactService, private companyService: CompanyService) {
    this.mode = 'create';
    this.contact = new Contact();
  }

  ngOnInit() {
    this.companyList();
  }

  companyList(): void {
    this.companyService.companiesListOfModal()
      .subscribe(
        res => {
          this.company = <Company[]> res['companies'];
          this.prepareOptions();
        },
        error => {
          window.alert('Error');
        }
      );
  }

  private prepareOptions(): void {
    this.company_options['companies'] = [];
    for (let i = 0; i < this.company.length; i++) {
      let company = this.company[i];
      this.company_options['companies'].push({id: company.id, name: company.name});
    }
  }

  getContactModal(contact_id: any): void {
    this.contact_id = contact_id;
    this.contactService.getContact(this.contact_id)
      .subscribe(
        res => {
          this.contact = <Contact> res['contacts'];
        },
        error => {
          window.alert('Error');
        }
      );
  }

  storeContact(): void {
    this.contactService.storeContactURL(this.contact)
      .subscribe(
        res => {
          this.contact = <Contact> res['contacts'];
          this.onSuccess('storeContact');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  updateContact(): void {
    this.contactService.updateContactURL(this.contact)
      .subscribe(
        res => {
          this.contact = <Contact> res['contacts'];
          this.onSuccess('updateContact');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  resetFormContact(mode, company_id) {
    this.mode = mode;
    if (this.mode === 'create') {
      this.contact = new Contact();
      this.contact.company_id = company_id;
    }
  }

  showCompanyContactsModal(): void {
    $('#ContactModal').modal('show');
  }

  modalClose(): void {
    $('#ContactModal').modal('hide');
  }

  private onSuccess(changeSuccess): void {
    this.success.emit(changeSuccess);
  }

  changeMode(mode) {
    this.mode = mode;
  }
}
