import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../message';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
  providers: [ChatService]
})
export class MainChatComponent implements OnInit {

  newMessage: string;
  user: string;
  messageList: string[] = [];

  constructor(private chatService: ChatService) {
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.messageList.push("me: " + this.newMessage);
    this.newMessage = '';
  }
  ngOnInit() {
    this.chatService.getMessages().subscribe(msg => {
      this.messageList.push(msg.msg);
      console.log(msg);
      console.log(`from: ${msg.id}`);
    })
  }
}


