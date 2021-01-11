import { Component, OnInit } from '@angular/core';
import { WhatsAppService } from '../whatsApp.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(private whatsAppService: WhatsAppService) { }

  ngOnInit(): void {
  }

  //this.whatsAppService.newContact(contact: Contact); --> Contact siehe Module
  //this.whatsAppService.editContact(contact: Contact); --> siehe Module Contact
  //this.whastAppService.deleteContact(id: string, username --> user sollte aus token geholt werden);

}
