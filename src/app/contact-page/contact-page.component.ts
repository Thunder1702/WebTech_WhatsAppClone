import { Component, OnInit } from '@angular/core';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { WhatsAppService } from '../whatsApp.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  url;
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
    this.whatsAppService.getImageContact(this.contactUsername).subscribe((res)=>{
      console.log("res: "+res);
      if(res === ""){
        this.url = 'http://localhost:3000/whatsAppClone_Service/profilBilder/default.jpg';
      }else{
        this.url ="http://localhost:3000/whatsAppClone_Service/profilBilder/"+ res;
      }
    },(err)=>{
      console.log("ERROR in getImage");
      console.log(err);
    });

  }

}
