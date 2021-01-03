import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../message';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css']
})
export class MainChatComponent implements OnInit {

  newMessage: string;
  messageList: string[] = [];

  constructor(private chatService: ChatService) {
    chatService.getMessages().subscribe(msg => {
      this.messageList.push(msg);
      console.log(msg);
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);

    this.messageList.push("me: " + this.newMessage);
    this.newMessage = '';
  }
  ngOnInit() {
  }
}