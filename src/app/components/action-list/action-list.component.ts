import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionService} from '../../../services/action.service';
import {TypeService} from '../../../services/type.service';
import {Action} from '../../../models/action';
import {Type} from '../../../models/type';
import {ModalActionListComponent} from '../modal-action-list/modal-action-list.component';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {
  @ViewChild(ModalActionListComponent) modalActionListComponent;
  public action_id: any;
  public actions: Action[];
  public thread_id: any;
  public mode: string;
  public action_options: {} = {actions: []};
  public showCreateContactAlert: string;
  constructor(private actionService: ActionService, private typeService: TypeService) {
    this.mode = 'create';
    this.showCreateContactAlert = 'invisible';
  }

  ngOnInit() {
  }

  actionsListByThread(thread_id: any): void {
    this.thread_id = thread_id;
    this.actionService.actionList(this.thread_id)
      .subscribe(
        res => {
          this.actions = <Action[]> res['actions'];

          this.prepareOptionsOfActions();
        },
        error => {
          window.alert('Error');
        }
      );
  }

  private prepareOptionsOfActions(): void {
    this.action_options['actions'] = [];
    for (let i = 0; i < this.actions.length; i++) {
      let action = this.actions[i];
      this.action_options['actions'].push({id: action.id, name: action.name, description: action.description,
        result: action.result, issue: action.issue, observation: action.observations, nextDate: action.nextDate,
        type_id: action.type_id, thread_id: action.thread_id
      });
    }
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

  deleteAction(action_id): void {
    this.action_id = action_id;
    this.modalActionListComponent.showDeleteActionModal(this.action_id);
  }

  addAction(mode): void {
    this.mode = mode;
    this.modalActionListComponent.showActionModal();
    this.modalActionListComponent.createAction(this.mode);
    this.modalActionListComponent.changeMode(this.mode);
  }

  actionById(action_id, mode): void {
    this.mode = mode;
    this.action_id = action_id;
    this.modalActionListComponent.showActionModal();
    this.modalActionListComponent.modalActionById(this.action_id);
    this.modalActionListComponent.modalTypeList();
    this.modalActionListComponent.changeMode(this.mode);
  }
}
