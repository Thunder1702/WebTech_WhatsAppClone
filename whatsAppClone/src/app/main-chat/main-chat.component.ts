import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../model/message';
import { WhatsAppService } from '../whatsApp.service';

interface msg {
  id: number,
  message_text: string,
  message_to: string,
  message_from: string
}

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'], 
  providers: [ChatService],
})
export class MainChatComponent implements OnInit {
  newMessage: string;
  user: string;
  messageList: msg[] = [];
  nM = new Message;
  id: number = 0;
  roomname: string;
  counter: number;
  buttondis: HTMLElement;

  constructor(private chatService: ChatService, private whatsAppService: WhatsAppService) { }

  sendMessage() {
    if (this.roomname.length !== 0) {
      if (!(this.newMessage === "" || this.newMessage == null)) {
        this.whatsAppService.getMaxMessageId().subscribe(
          (res) => {

            console.log("res: " + res);
            this.id = parseInt(res) + 1;
            console.log("Id++ = " + this.id);
            this.nM.id = this.id;
            this.nM.message_from = "test0";
            this.nM.message_to = this.roomname;
            this.chatService.sendMessage(this.nM);

          }, (err) => {
            console.log(err);
          });

        this.nM.message_text = this.newMessage;
        this.messageList.push({ message_to: this.roomname, message_from: this.user, id: 0, message_text: this.newMessage });
        this.newMessage = '';
      }
    }
  }

  ngOnInit() {
    this.buttondis = document.getElementById('button-header');
    this.buttondis.style.visibility = "hidden";

    this.chatService.getMessage().subscribe((msg) => {

      if (msg === "Update") {
        this.setChatHistory();
      }
    })
  }

  setChatHistory() {
    this.whatsAppService.getChatHistoryFromContactUser(this.roomname).subscribe((res: msg[]) => {
      res.forEach((message) => {
        this.messageList.push(message);
      });
      this.counter = res[res.length - 1].id;
    })
  }

  getData(asd: msg){
    return JSON.stringify(asd);
  }
}
