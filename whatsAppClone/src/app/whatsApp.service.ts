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

  deleteContact(id: number, user: string): void {
    this.http.delete(`${this.baseURL}/contacts/deleteContact/${id}/${user}`, this.httpOptions).
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

  getAllContactsFromUser(user: string): Observable<any> {
    return this.http.get(`${this.baseURL}/contacts/getAllContactsFromUser/${user}`);
  }

  //Message 

  getAllMessages(): Observable<any> {
    return this.http.get(`${this.baseURL}/mainChat/getMessages`);
  }

  getMessageById(id: number,user: string): Observable<any> {
      return this.http.get(`${this.baseURL}/mainChat/getMessage/${id}/${user}`);
  }

  sendMessage(message: Message): Observable<any> {
      return this.http.post(`${this.baseURL}/mainChat/sendMessage`,message,this.httpOptions);
  }

  getChatHistoryFromContactUser(user: string, id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/mainChat/getChatHistoryUserContact/${user}/${id}`);
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

  //Eventuell passwort und username als parameter schicken?
  // signIn(user: User): Observable<any> {
  //   return this.http.get(`${this.baseURL}/login/signIn`,user,this.httpOptions);
  // }

}