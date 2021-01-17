import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { WhatsAppService } from '../whatsApp.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contactList: string[] = [];
  contact: string;
  nC: Contact;

  constructor(private whatsAppService: WhatsAppService) { }

  ngOnInit(): void {

    this.whatsAppService.getAllContactsFromUser().subscribe((res) => {
      for (let con in res) {
        this.contactList.push(res[con].contact_username);
        console.log(res[con].contact_username);
        this.displayContact(res[con]);
      }
    }, (err) => {
      console.log(err);
    });
  }
  displayContact(res){
    var sel = document.getElementById('contactlist');
    let opt = document.createElement('option');
    opt.value = res.contact_username;
    opt.appendChild(document.createTextNode(res.contact_username));
    opt.addEventListener("click", (event) => {
      this.contact = res.contact_username;

      (document.getElementById('first_name') as HTMLInputElement).value = res.first_name;
      (document.getElementById('last_name') as HTMLInputElement).value = res.last_name;
      (document.getElementById('email') as HTMLInputElement).value = res.email;
      (document.getElementById('phone_number') as HTMLInputElement).value = res.phone_number;
      
    });

    sel.appendChild(opt);

  }

  addContact(){
    let firts_name = (document.getElementById('add_first_name') as HTMLInputElement).value;
    console.log(firts_name);
    this.nC = new Contact;
    this.nC.first_name = firts_name.toString();
    this.nC.last_name = (document.getElementById('add_last_name') as HTMLInputElement).value;
    this.nC.email = (document.getElementById('add_email') as HTMLInputElement).value;
    this.nC.phone_number = parseInt((document.getElementById('add_phone_number') as HTMLInputElement).value);
    this.nC.users_contact = '';

    this.whatsAppService.getUsernameFromContact(this.nC.email).subscribe((res)=>{
      console.log("Response of get Username from new contact: "+res);
      this.nC.contact_username = res;
      this.whatsAppService.newContact(this.nC).subscribe((res)=>{
        console.log(res);

      },(err)=>{
        console.log(err);
      });
    },(err)=>{
      console.log(err);
    });

  }

  deleteContact(){

    this.whatsAppService.deleteContact(this.contact).subscribe((res) => {
      console.log("deleted contact");
    }), (error) => {
      console.log("could not delete contact");
    };

  }
  editContact(){
    this.nC = new Contact;
    this.nC.first_name = (document.getElementById('first_name') as HTMLInputElement).value;
    this.nC.last_name = (document.getElementById('last_name') as HTMLInputElement).value;
    this.nC.email = (document.getElementById('email') as HTMLInputElement).value;
    this.nC.phone_number = parseInt((document.getElementById('phone_number') as HTMLInputElement).value);

    this.nC.users_contact = '';
    this.nC.contact_username = this.contact;

    this.whatsAppService.editContact(this.nC).subscribe((res)=> {
      console.log(res);
    },(err)=> {
      console.log(err);
    })

  }

}
