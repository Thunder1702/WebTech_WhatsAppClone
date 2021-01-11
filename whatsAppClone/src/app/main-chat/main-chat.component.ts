import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
  providers: [ChatService],
})
export class MainChatComponent implements OnInit {
  newMessage: string;
  user: string;
  messageList: string[] = [];
 
  constructor(private chatService: ChatService) { }


  sendMessage() {
   // document.querySelector('div p').id= "message_bubble1"

    if (!(this.newMessage === ""||this.newMessage==null)) {
      /*let element = document.createElement("p");
      element.innerHTML = "{{ message }}";
      element.id="message_bubble2";
      let div = document.getElementById("div_id");
      element.appendChild(div);*/
      this.chatService.sendMessage(this.newMessage);
      this.messageList.push('me: ' + this.newMessage);
      this.newMessage = '';
    }

  }
  ngOnInit() {

    this.chatService.connect();
   
    // this.chatService.getMessage().subscribe((msg) => { 
    // /*  let element = document.createElement("p");
    //   element.innerHTML = "{{ message }}";
    //   element.id="message_bubble1";
    //   let div = document.getElementById("div_id");
    //   element.appendChild(div);*/
    //   //document.querySelector('div p').id="message_bubble2"
    //   this.messageList.push('other contact: ' + msg.msg);
    //   console.log(msg);
    //   console.log(`from: ${msg.id}`);
    // });
  }

  //this.whatsAppService.sendMessage(message: Message); --> Message siehe Module
  //this.whastAppService.getChatHistoryFromContactUser(username --> soll aus token geholt werden, id: string);
}
