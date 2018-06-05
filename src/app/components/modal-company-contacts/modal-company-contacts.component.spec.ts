import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompanyContactsComponent } from './modal-company-contacts.component';

describe('ModalCompanyContactsComponent', () => {
  let component: ModalCompanyContactsComponent;
  let fixture: ComponentFixture<ModalCompanyContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCompanyContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompanyContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
