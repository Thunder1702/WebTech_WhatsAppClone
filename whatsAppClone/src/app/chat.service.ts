import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket;
  constructor() {
    this.socket = io('http://localhost:3000');
  }


  sendMessage(message: string) {
    this.socket.emit("sendMessage", message);
  }

  public getMessages(): Observable<string> {
    return Observable.create(observer => {
      this.socket.on('message', (msg: string) => {
        observer.next(msg);
      });
    });
  }
}
