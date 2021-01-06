import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable()
export class ChatService {

  static socket;
  private myID = Math.random();

  constructor() {
    //setInterval(() => {
    //  console.log(this.myID);
    //  console.log(ChatService.socket);
    //}, 1000);
  }

  connect(): Promise<void> {
    ChatService.socket = io('http://localhost:3000');
    return new Promise((res, rej) => {

      ChatService.socket.on('connect', () => {
        //console.log(this.myID);
        console.log("connected!");
        res();
        // either with send()
        //this.socket.send('Hello!');

        // or with emit() and custom event names
        //this.socket.emit('salutations', 'Hello!', { 'mr': 'john' }, Uint8Array.from([1, 2, 3, 4]));
      });

    });
  }


  sendMessage(message: string) {
    ChatService.socket.emit("sendMessage", message);
  }

  createChat(name: string) {
    ChatService.socket.emit("createChat", name);
  }

  getMessage(): Observable<{ id: string, msg: string }> {
    return Observable.create(observer => {
      ChatService.socket.on('message', (msg: string) => {
        observer.next(msg);
      });
    });
  }

  getNewChat(): Observable<{ id: number, name: string }> {
    return Observable.create(observer => {
      ChatService.socket.on('newChat', (msg: string) => {
        observer.next(msg);
      });
    });
  }
}
