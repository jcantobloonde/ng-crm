import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompaniesComponent } from './modal-companies.component';

describe('ModalCompaniesComponent', () => {
  let component: ModalCompaniesComponent;
  let fixture: ComponentFixture<ModalCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
