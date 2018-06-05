import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import {Contact} from '../../../models/contact';
import {ContactService} from '../../../services/contact.service';
import {Company} from '../../../models/company';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  public contact: Contact;
  public mode: string;
  public contact_id: any;
  public company_options: {} = {companies: []};
  public companies: Company[];
  public changeSuccess: string;
  @Output() success: EventEmitter<string> = new EventEmitter();
  constructor(private companyService: CompanyService, private contactService: ContactService) {
    this.mode = 'view';
    this.contact = new Contact();
  }
  ngOnInit() {
    this.companyList();
  }

  companyList(): void {
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
  getContactById(contact_id: any): void {
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
          this.onSuccess('store');
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
          this.onSuccess('update');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  deleteContact(): void {
    this.contactService.deleteContactUrl(this.contact_id)
      .subscribe(
        res => {
          this.contact = <Contact> res['contacts'];
          this.onSuccess('delete');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }
  showModal(): void {
    $('#Modal').modal('show');
  }
  modalConfirmDelete(): void {
    this.modalClose();
    this.deleteContact();
  }
  modalClose(): void {
    $('#Modal').modal('hide');
  }

  changeMode(mode) {
    this.mode = mode;
  }

  resetFormContact(mode) {
    this.mode = mode;
    if (this.mode === 'create') {
      this.contact = new Contact();
    }
  }

  private onSuccess(changeSuccess): void {
    this.success.emit(changeSuccess);
  }
}
