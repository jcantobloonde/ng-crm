import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';

@Component({
  selector: 'app-modal-companies',
  templateUrl: './modal-companies.component.html',
  styleUrls: ['./modal-companies.component.css']
})
export class ModalCompaniesComponent implements OnInit {
  public mode: string;
  public company_id: any;
  public company: Company;
  @Output() success: EventEmitter<string> = new EventEmitter();
  constructor(private companyService: CompanyService) {
    this.mode = 'create';
    this.company = new Company();
  }

  ngOnInit() {
  }

  companyNameModal(company_id): void {
    this.company_id = company_id;
    this.companyService.companyModalName(this.company_id)
      .subscribe(
        res => {
          this.company = <Company> res['companies'];
        },
        error => {
          window.alert('Error');
        }
      );
  }

  storeCompany(): void {
    this.companyService.storeCompany(this.company)
      .subscribe(
        res => {
          this.company = <Company> res['companies'];
          this.onSuccess('storeCompany');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  updateCompany(): void {
    this.companyService.updateCompany(this.company)
      .subscribe(
        res => {
          this.company = <Company> res['companies'];
          this.onSuccess('updateCompany');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  deleteCompany(): void {
    this.companyService.deleteCompany(this.company_id)
      .subscribe(
        res => {
          this.company = <Company> res['companies'];
          this.onSuccess('deleteCompany');
          this.modalDeleteClose();
        },
        error => {
          this.onSuccess('error');
        }
      );
  }


  addCompanyModal(mode) {
    this.mode = mode;
    if (this.mode === 'create') {
      this.company = new Company();
    }
  }

  showCompanyModal(company_id, mode): void {
    this.company_id = company_id;
    this.mode = mode;
    if (!this.company_id && this.mode === 'edit') {
      this.onSuccess('error2');
    } else {
      $('#Modal2').modal('show');
    }
  }

  showDeleteCompanyModal(): void {
    if (!this.company_id) {
      this.modalClose();
      this.onSuccess('error');
    } else {
      this.modalClose();
      $('#ModalDeleteCompany').modal('show');
    }
  }

  modalConfirmDelete(): void {
    this.deleteCompany();
  }

  modalClose(): void {
    $('#Modal2').modal('hide');
  }

  modalDeleteClose(): void {
    $('#ModalDeleteCompany').modal('hide');
  }

  changeMode(mode) {
    this.mode = mode;
  }

  private onSuccess(changeSuccess): void {
    this.success.emit(changeSuccess);
  }
}
