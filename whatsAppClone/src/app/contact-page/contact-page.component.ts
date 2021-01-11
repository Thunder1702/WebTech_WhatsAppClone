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
    this.whatsAppService.getAllContacts().subscribe(() => {});
  }

}
