import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../model/message';
import { WhatsAppService } from '../whatsApp.service';

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
  nM = new Message;
 
  constructor(private chatService: ChatService, private whatsAppService: WhatsAppService) { }


  sendMessage() {
   // document.querySelector('div p').id= "message_bubble1"

    if (!(this.newMessage === ""||this.newMessage==null)) {
      /*let element = document.createElement("p");
      element.innerHTML = "{{ message }}";
      element.id="message_bubble2";
      let div = document.getElementById("div_id");
      element.appendChild(div);*/
      let id:number;
      this.whatsAppService.getMaxMessageId().subscribe(
        (res) => {
          console.log("res: "+res);
          id = parseInt(res) + 1;
          console.log("Id++ = "+ id );
        }, (err) => {
          console.log(err);
        });
      
      this.nM.id = id;
      this.nM.message_from = "Larissa";
      this.nM.message_to ="1";
      this.nM.message_text = this.newMessage;
    

      // this.chatService.sendMessage(this.nM);
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
