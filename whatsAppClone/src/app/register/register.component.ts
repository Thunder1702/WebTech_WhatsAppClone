import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string;
  email: string;
  password: string;

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _chat: ChatService
  ) {}
  ngOnInit() {}
  onSubmit() {
    console.log(this.username);
    console.log(this.password);
    console.log(this.email);

    this._auth.register(this.username, this.password, this.email).subscribe(
      (res) => {
        console.log(res);
        console.log('registered succesfully');
        sessionStorage.setItem('token', (res as any).token);

        this._chat.connect();
        this._router.navigate(['/mainChat']);
      },
      (err) => {
        console.error(err);
        console.error('err register');
        let logmsg = "This Username already exists. Please try another one.";
        let logger= document.getElementById("log");
       
        
        if(this.username && this.password &&this.email){
         let output= logger.innerHTML = logmsg;
      }
    }
    )}
}
