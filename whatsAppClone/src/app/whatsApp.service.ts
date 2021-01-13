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

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http: HttpClient) { }

  //Contact

  newContact(contact: Contact): Observable<any> {
      return this.http.post(`${this.baseURL}/contacts/newContact`,contact);
  }

  deleteContact(id: number, user: string): void {
    this.http.delete(`${this.baseURL}/contacts/deleteContact/${id}/${user}`).
    subscribe((res) => {
      console.log("deleted contact");
    }), (error) => {
      console.log("could not delete contact");
    };
  }

  editContact(contact: Contact): Observable<any> {
    return this.http.put(`${this.baseURL}/contacts/editContact`,contact);
  }

  getAllContacts(): Observable<any> {
      return this.http.get(`${this.baseURL}/contacts/getContacts`);
  }

  getAllContactsFromUser(): Observable<any> {
    return this.http.get(`${this.baseURL}/contacts/getAllContactsFromUser`);
  }

  getUsernameFromContact(email: string): Observable<any> {
    return this.http.get(`${this.baseURL}/contacts/getUsernameFromContact/${email}`);
  }

  //Message 

  getAllMessages(): Observable<any> {
    return this.http.get(`${this.baseURL}/mainChat/getMessages`);
  }

  getMessageById(id: number,user: string): Observable<any> {
      return this.http.get(`${this.baseURL}/mainChat/getMessage/${id}/${user}`);
  }

  sendMessage(message: Message): Observable<any> {
    console.log("sendMessage Request from Client to Server");
    return this.http.post(`${this.baseURL}/mainChat/sendMessage`,message);
  }

  getChatHistoryFromContactUser( contactUsername: string): Observable<any> {
    return this.http.get(`${this.baseURL}/mainChat/getChatHistoryUserContact/${contactUsername}`);
  }
 
  //Photo

  uploadPhoto(photo: Photo): Observable<any> {
      return this.http.post(`${this.baseURL}/mainChat/uploadPhoto`,photo);
  }

  getAllPhotos(): Observable<any> {
      return this.http.get(`${this.baseURL}/mainChat/getPhotos`);
  }

  //User

  editUser(user: User): Observable<any> {
      return this.http.put(`${this.baseURL}/profile/edit`,user);
  }

  getUser(username: string): Observable<any> {
      return this.http.get(`${this.baseURL}/profile/${username}`);
  }

  //Max id value

  getMaxMessageId(): Observable<any> {
    return this.http.get(`${this.baseURL}/maxMessageId`);
  }

  getMaxPhotoId(): Observable<any> {
    return this.http.get(`${this.baseURL}/maxPhotoId`);
  }
  getMaxContactId(): Observable<any> {
    return this.http.get(`${this.baseURL}/maxContactId`);
  }
}