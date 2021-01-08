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
    if (!(this.newMessage === ""||this.newMessage==null)) {
      this.chatService.sendMessage(this.newMessage);
      this.messageList.push('me: ' + this.newMessage);
      this.newMessage = '';
    }

  }
  ngOnInit() {
    this.chatService.getMessage().subscribe((msg) => {
      this.messageList.push('other contact: ' + msg.msg);
      console.log(msg);
      console.log(`from: ${msg.id}`);
    });
  }
}
