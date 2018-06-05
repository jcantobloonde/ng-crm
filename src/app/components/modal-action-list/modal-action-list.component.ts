import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Action} from '../../../models/action';
import {Type} from '../../../models/type';
import {ActionService} from '../../../services/action.service';
import {TypeService} from '../../../services/type.service';

@Component({
  selector: 'app-modal-action-list',
  templateUrl: './modal-action-list.component.html',
  styleUrls: ['./modal-action-list.component.css']
})
export class ModalActionListComponent implements OnInit {
  public action: Action;
  public type_options: {} = {types: []};
  public types: Type[];
  public action_id: any;
  public mode: string;
  @Output() success: EventEmitter<string> = new EventEmitter();
  @Input() inputThreadId: any;
  constructor(private actionService: ActionService, private typeService: TypeService) {
    this.mode = 'create';
  }

  ngOnInit() {
    this.modalTypeList();
  }

  modalActionById(action_id): void {
    this.action_id = action_id;
    this.actionService.getActionById(this.action_id)
      .subscribe(
        res => {
          this.action = <Action> res['actions'];
        },
        error => {
          window.alert('Error');
        }
      );
  }

  modalTypeList(): void {
    this.typeService.list()
      .subscribe(
        res => {
          this.types = <Type[]> res['types'];
          this.prepareOptionsOfTypes();
        },
        error => {
          window.alert('Error');
        }
      );
  }

  private prepareOptionsOfTypes(): void {
    this.type_options['types'] = [];
    for (let i = 0; i < this.types.length; i++) {
      let type = this.types[i];
      this.type_options['types'].push({id: type.id, name: type.name});
    }
  }

  storeAction(): void {
    this.action.thread_id = this.inputThreadId;
    this.actionService.storeAction(this.action)
      .subscribe(
        res => {
          this.action = <Action> res['actions'];
          this.onSuccess('storeAction');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  updateAction(): void {
    this.actionService.updateAction(this.action)
      .subscribe(
        res => {
          this.action = <Action> res['actions'];
          this.onSuccess('updateAction');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  deleteAction(): void {
    this.actionService.deleteAction(this.action_id)
      .subscribe(
        res => {
          this.action = <Action> res['actions'];
          this.onSuccess('deleteAction');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  showActionModal(): void {
    $('#ModalAction').modal('show');
  }

  showDeleteActionModal(action_id): void {
    this.action_id = action_id;
    $('#ModalDeleteAction').modal('show');
    this.modalClose();
  }

  modalConfirmDelete(): void {
    this.modalDeleteClose();
    this.deleteAction();
  }

  modalClose(): void {
    $('#ModalAction').modal('hide');
  }

  modalDeleteClose(): void {
    $('#ModalDeleteAction').modal('hide');
  }

  createAction(mode) {
    this.mode = mode;
    if (this.mode === 'create') {
      this.action = new Action();

    }
  }

  changeMode(mode) {
    this.mode = mode;
  }

  private onSuccess(changeSuccess): void {
    this.success.emit(changeSuccess);
  }
}
