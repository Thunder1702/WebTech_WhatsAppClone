import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _chat: ChatService
  ) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.username);
    console.log(this.password);
  
    this._auth.login(this.username, this.password).subscribe(
      (res) => {
        console.log(res);
        console.log('logged in');
        sessionStorage.setItem('token', (res as any).token);

        this._chat.connect();
        this._router.navigate(['/mainChat']);

     
      },
      (err) => {
        console.error(err);
        //let log= console.log('Username or password is not correct');
        let logmsg = "Username or Password is not correct. Please try again.";
        let logger= document.getElementById("log");
        
        if(this.username && this.password){
         let output= logger.innerHTML = logmsg;
        }
       
      }
    );
  }
}
