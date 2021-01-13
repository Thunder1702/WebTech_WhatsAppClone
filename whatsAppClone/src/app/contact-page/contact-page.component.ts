import { Component, OnInit } from '@angular/core';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { WhatsAppService } from '../whatsApp.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  contactUsername: string;
  constructor(private whatsAppService: WhatsAppService) { }

  ngOnInit(): void {

    this.contactUsername = this.whatsAppService.getContactUsername();

    this.whatsAppService.getContact(this.contactUsername).subscribe((res)=>{
      console.log(res);
      document.querySelector('#contactName').setAttribute('value',res[0].contact_username);
      document.querySelector('#contactEmail').setAttribute('value',res[0].email);
    },(err)=>{
      console.log(err);
    })
    //this.whatsAppService.getAllContacts().subscribe(() => {});

    //this.whatsAppService.getContact() --> am besten an server wird die id des Contact geschickt
    //neuer request in server
    //this.whatsAppService.getPhoto()
    //neuer request im server
  }

}
