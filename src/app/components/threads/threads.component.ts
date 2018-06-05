import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThreadService} from '../../../services/thread.service';
import {Thread} from '../../../models/thread';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {
  public thread: Thread;
  public thread_id: any;
  public mode: string;
  public thread_options: {} = {threads: []};
  @Output() success: EventEmitter<string> = new EventEmitter();
  @Input() inputContactId: any;
    constructor(private threadService: ThreadService) {
    this.mode = 'view';
    this.thread = new Thread();
  }
  ngOnInit() {
    this.threadsOfContact();
  }

  threadsOfContact(): void {
    this.threadService.list()
      .subscribe(
        res => {
          this.thread = <Thread> res['threads'];
        },
        error => {
          window.alert('Error');
        }
      );
  }

  threadSelected(thread_id): void {
    this.thread_id = thread_id;
    this.threadService.threadById(this.thread_id)
      .subscribe(
        res => {
          this.thread = <Thread> res['threads'];
        },
        error => {
          window.alert('Error');
        }
      );
  }

  storeThread(): void {
    this.thread.contact_id = this.inputContactId;
    this.threadService.storeThread(this.thread)
      .subscribe(
        res => {
          this.thread = <Thread> res['threads'];
          this.onSuccess('storeThread');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  updateThread(): void {
    this.threadService.updateThread(this.thread)
      .subscribe(
        res => {
          this.thread = <Thread> res['threads'];
          this.onSuccess('updateThread');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  deleteThread(): void {
    this.threadService.deleteThread(this.thread_id)
      .subscribe(
        res => {
          this.thread = <Thread> res['threads'];
          this.onSuccess('deleteThread');
        },
        error => {
          this.onSuccess('error');
        }
      );
  }

  showModal(): void {
    $('#ModalDeleteThread').modal('show');
  }

  modalConfirmDelete(): void {
    this.modalClose();
    this.deleteThread();
  }

  modalClose(): void {
    $('#ModalDeleteThread').modal('hide');
  }

  changeMode(mode) {
    this.mode = mode;
  }

  resetFormThread(mode) {
    this.mode = mode;
    if (this.mode === 'create') {
      this.thread = new Thread();
    }
  }

  private onSuccess(changeSuccess): void {
    this.success.emit(changeSuccess);
  }
}
