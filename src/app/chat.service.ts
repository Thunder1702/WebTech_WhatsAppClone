import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { WhatsAppService } from './whatsApp.service';
import { Message } from './model/message';
import { environment } from '../environments/environment';

@Injectable()
export class ChatService{
  static socket: Socket;

  constructor(private whatsAppService: WhatsAppService) {}

  connect() {

    // var wsSocket = new WebSocket("ws://localhost:3000");

    // wsSocket.onopen = function(event){
    //   console.log("connected to server !!! ");
    // }
    ChatService.socket = io(environment.baseURL+'');
    return new Promise((res, rej) => {
      ChatService.socket.on('connect', () => {
        //console.log(this.myID);
        console.log('connected!');
        res();
      });
    });
  }
  
  disconnectFromServer(){
    ChatService.socket.close();
  }

  sendMessage(message: Message) {
    this.whatsAppService.sendMessage(message).subscribe(
      (res) => {
        console.log(res);
        console.log("Sended");
      },(err)=>{
        console.error(err);
      }
    );
    ChatService.socket.emit('sendMessage', "sendMessage");
  }

  // createChat(name: string) {
  //   ChatService.socket.emit('createChat', name);
  // }

  getMessage(): Observable<any> {
    return Observable.create((observer) => {
      ChatService.socket.on('message', (msg: string) => {
        console.log("On Client from Server: "+ msg);
        observer.next(msg);
      });
    });
  }

  // getNewChat(): Observable<{ id: number; name: string }> {
  //   return Observable.create((observer) => {
  //     ChatService.socket.on('newChat', (msg: string) => {
  //       observer.next(msg);
  //     });
  //   });
  // }
}
