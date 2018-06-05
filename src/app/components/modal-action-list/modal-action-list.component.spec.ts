import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActionListComponent } from './modal-action-list.component';

describe('ModalActionListComponent', () => {
  let component: ModalActionListComponent;
  let fixture: ComponentFixture<ModalActionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
