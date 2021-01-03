import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  //chatNr = 0;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    document.querySelector("#create_chat").addEventListener("click", () => {
      this.createChat();
    });

    this.chatService.getNewChats().subscribe(chat => {
      console.log("got new chat" + chat.name);
      this.displayChat(chat.name + "_" + chat.id);
    })
  }

  createChat() {

    // create text node to add to option element (opt)
    //let chatName = 'chat' + this.chatNr++;


    // set value property of opt
    this.chatService.createChat("chat");

    //this.displayChat(chatName);

  }

  displayChat(name) {
    // get reference to select element
    var sel = document.getElementById('chat_list');
    // create new option element
    var opt = document.createElement('option');

    opt.value = name;
    opt.appendChild(document.createTextNode(name));


    opt.addEventListener("click", () => {
      //TODO: join chat
      console.log("Todo: join chat");
      console.log(opt.value.split("_")[1]);
    });

    // add opt to end of select box (sel)
    sel.appendChild(opt);

  }

}
