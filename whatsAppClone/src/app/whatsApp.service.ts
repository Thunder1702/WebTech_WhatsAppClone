import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Contact } from './model/contact';
import { Message } from './model/message';
import { Photo } from './model/photos';
import { User } from './model/user';

@Injectable({
    providedIn: 'root'
  })
export class WhatsAppService {

  baseURL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //Contact

  newContact(contact: Contact): Observable<any> {
      return this.http.post(`${this.baseURL}/contacts/newContact`,contact,this.httpOptions);
  }

  deleteContact(id: number): void {
    this.http.delete(`${this.baseURL}/contacts/deleteContact/${id}`, this.httpOptions).
    subscribe((res) => {
      console.log("deleted contact");
    }), (error) => {
      console.log("could not delete contact");
    };
  }

  editContact(contact: Contact): Observable<any> {
    return this.http.put(`${this.baseURL}/contacts/editContact`,contact,this.httpOptions);
  }

  getAllContacts(): Observable<any> {
      return this.http.get(`${this.baseURL}/contacts/getContacts`);
  }

  //Message 

  getAllMessages(): Observable<any> {
    return this.http.get(`${this.baseURL}/mainChat/getMessages`);
  }

  getMessageById(id: number): Observable<any> {
      return this.http.get(`${this.baseURL}/mainChat/getMessage/${id}`);
  }

  sendMessage(message: Message): Observable<any> {
    //   let nM = new Message();
    //   nM.messageTo_id = message.messageTo_id;
    //   nM.messageFrom_id = message.messageFrom_id;
    //   nM.messageText = message.messageText;
    //   nM.read = message.read;
    //   nM.id = message.id;
      return this.http.post(`${this.baseURL}/mainChat/sendMessage`,message,this.httpOptions);
  }
 
  //Photo

  uploadPhoto(photo: Photo): Observable<any> {
      return this.http.post(`${this.baseURL}/mainChat/uploadPhoto`,photo,this.httpOptions);
  }

  getAllPhotos(): Observable<any> {
      return this.http.get(`${this.baseURL}/mainChat/getPhotos`);
  }

  //User

  registerUser(user: User): Observable<any> {
      return this.http.post(`${this.baseURL}/login/register`,user,this.httpOptions);
  }

  editUser(user: User): Observable<any> {
      return this.http.put(`${this.baseURL}/profile/edit`,user,this.httpOptions);
  }

  getUser(username: string): Observable<any> {
      return this.http.get(`${this.baseURL}/profile/${username}`);
  }

}