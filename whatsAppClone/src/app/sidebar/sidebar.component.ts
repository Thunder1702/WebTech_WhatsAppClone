import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { WhatsAppService } from '../whatsApp.service';
import { MainChatComponent } from '../main-chat/main-chat.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  //chatNr = 0;
  contactList: string[] = [];

  constructor(private chatService: ChatService, private authService: AuthService, private whatsAppService: WhatsAppService,private mainChatComp: MainChatComponent) {
  }

  ngOnInit(): void {
    // document.querySelector("#create_chat").addEventListener("click", () => {
    //   this.createChat();

    // });

    // this.chatService.getNewChat().subscribe(chat => {
    //   console.log("got new chat" + chat.name);
    //   this.displayChat(chat.name + "_" + chat.id);
    // })
    document.querySelector('#logout').addEventListener("click", () => {
      this.logOut();
    })

    this.whatsAppService.getAllContactsFromUser().subscribe((res) => {
      for(let con in res){
        this.contactList.push(res[con].contact_username);
        console.log(res[con].contact_username);
        this.displayChat(res[con].contact_username);
      }
    }, (err) => {
      console.log(err);
    });
  }

  // createChat() {

    // create text node to add to option element (opt)
    //let chatName = 'chat' + this.chatNr++;


    // set value property of opt
    // this.chatService.createChat("chat");

    //this.displayChat(chatName);

  // }

  displayChat(name) {
    // get reference to select element
    var sel = document.getElementById('chat_list');
    // create new option element
    var opt = document.createElement('option');

    opt.value = name;
    opt.appendChild(document.createTextNode(name));


    opt.addEventListener("click", (event) => {
      console.log(event.target);
      this.mainChatComp.roomname = name;
      this.mainChatComp.messageList = [];
      this.whatsAppService.setContactUsername(name);
      this.mainChatComp.setChatHistory();
      
      //console.log(opt.value.split("_")[1]);
    });

    // add opt to end of select box (sel)
    sel.appendChild(opt);

  }

  logOut() {

    this.chatService.disconnectFromServer();
    sessionStorage.removeItem('token');
    console.log("logOut because click on the back to signin button");
  }

  //getAllContactsFromUser sofort bei OnInit aufrufen !!!
  //this.whatsAppService.getAllContactsFromUser(user --> soll aus token gelesen werden);
  //wenn contact aus liste angeklickt wird, muss mainChat benachrichtig werden und dort updaten den Chatverauf und ROOm Name

}
