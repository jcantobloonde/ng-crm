import {Component, OnInit, ViewChild} from '@angular/core';
import { ContactService } from '../../services/contact.service';
import {ThreadService} from '../../services/thread.service';
import {ActionListComponent} from '../components/action-list/action-list.component';
import {ContactsComponent} from '../components/contacts/contacts.component';
import {ThreadsComponent} from '../components/threads/threads.component';
import {Contact} from '../../models/contact';
import {Thread} from '../../models/thread';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(ActionListComponent) actionListComponent;
  @ViewChild(ContactsComponent) contactComponent;
  @ViewChild(ThreadsComponent) threadComponent;
  public showCreateContactAlert: string;
  public changeSuccess: string;
  public contact: Contact[];
  public threads: Thread[];
  public thread_id: any;
  public contact_id: any;
  public contact_options: {} = {contacts: []};
  public thread_options: {} = {threads: []};

  constructor(private contactService: ContactService, private threadService: ThreadService) {
    this.showCreateContactAlert = 'invisible';
  }
  ngOnInit() {
    this.contactsList();
  }

  contactsList(): void {
    this.contactService.contactsCompanyList()
      .subscribe(
        res => {
          this.contact = <Contact[]> res['contacts'];
          this.prepareOptionsContacts();
        },
        error => {
          window.alert('Error');
        }
      );
  }

  private prepareOptionsContacts(): void {
    this.contact_options['contacts'] = [];
    for (let i = 0; i < this.contact.length; i++) {
      let contact = this.contact[i];
      this.contact_options['contacts'].push({id: contact.id, name: contact.name, surname: contact.surname, email: contact.email,
        role: contact.role, main_contact: contact.main_contact, created_at: contact.created_at, updated_at: contact.updated_at,
        company_id: contact.company_id});
    }
  }

  threadsList(): void {
    this.threadService.list(this.contact_id)
      .subscribe(
        res => {
          this.threads = <Thread[]> res['threads'];
          this.prepareOptionsThreads();
        },
        error => {
          window.alert('Error');
        }
      );
  }

  private prepareOptionsThreads(): void {
    this.thread_options['threads'] = [];
    for (let i = 0; i < this.threads.length; i++) {
      let thread = this.threads[i];
      this.thread_options['threads'].push({id: thread.id, name: thread.name, description: thread.description,
        status: thread.status, interest: thread.interest, source: thread.source, created_at: thread.created_at,
        updated_at: thread.updated_at, contact_id: thread.contact_id});
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

  actionsList(): void {
    this.actionListComponent.actionsListByThread(this.thread_id);
  }
  contactForm(): void {
    this.contactComponent.getContactById(this.contact_id);
  }
  threadForm(): void {
    this.threadComponent.threadSelected(this.thread_id);
  }
}
