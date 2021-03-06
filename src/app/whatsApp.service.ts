import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Contact } from './model/contact';
import { Message } from './model/message';
import { Photo } from './model/photos';
import { User } from './model/user';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class WhatsAppService {

  baseURL = environment.baseURL;
  contactUsername: string;

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http: HttpClient) { }

  //Contact

  newContact(contact: Contact): Observable<any> {
      return this.http.post(`${this.baseURL}/contacts/newContact`,contact);
  }

  deleteContact(contact_username: string): Observable<any> {
   return this.http.delete(`${this.baseURL}/contacts/deleteContact/${contact_username}`);
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

  getContact(contactUsername: string) : Observable<any> {
    return this.http.get(`${this.baseURL}/contacts/getContact/${contactUsername}`);
  }

  //Message 

  getAllMessages(): Observable<any> {
    return this.http.get(`${this.baseURL}/mainChat/getMessages`);
  }

  getMessageById(id: number): Observable<any> {
      return this.http.get(`${this.baseURL}/mainChat/getMessage/${id}`);
  }

  sendMessage(message: Message): Observable<any> {
    console.log("sendMessage Request from Client to Server");
    return this.http.post(`${this.baseURL}/mainChat/sendMessage`,message);
  }

  getChatHistoryFromContactUser( contactUsername: string): Observable<any> {
    return this.http.get(`${this.baseURL}/mainChat/getChatHistoryUserContact/${contactUsername}`);
  }
 
  //Photo
  getImageUser(): Observable<any> {
    return this.http.get(`${this.baseURL}/getImageUser`);
  }

  getImageContact(contactUsername:string): Observable<any> {
    return this.http.get(`${this.baseURL}/getImageContact/${contactUsername}`);
  }

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

  getUser(): Observable<any> {
      return this.http.get(`${this.baseURL}/profile`);
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

  setContactUsername(name: string){
    this.contactUsername = name;
  }
  getContactUsername(): string{
    return this.contactUsername;
  }
}