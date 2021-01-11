import { Component, OnInit } from '@angular/core';
import { WhatsAppService } from '../whatsApp.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  constructor(private whatsAppService: WhatsAppService) { }

  ngOnInit(): void {
    //this.whatsAppService.getAllContacts().subscribe(() => {});

    //this.whatsAppService.getContact() --> am besten an server wird die id des Contact geschickt
    //neuer request in server
    //this.whatsAppService.getPhoto()
    //neuer request im server
  }

}
