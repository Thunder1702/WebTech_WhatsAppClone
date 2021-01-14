import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../model/message';
import { WhatsAppService } from '../whatsApp.service';

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
  nM = new Message;
  id: number = 0;
  roomname: string;
  counter: number;
 
  constructor(private chatService: ChatService, private whatsAppService: WhatsAppService) { }


  sendMessage() {
   // document.querySelector('div p').id= "message_bubble1"
   if(this.roomname.length !== 0){
        
  

    if (!(this.newMessage === ""||this.newMessage==null)) {
      /*let element = document.createElement("p");
      element.innerHTML = "{{ message }}";
      element.id="message_bubble2";
      let div = document.getElementById("div_id");
      element.appendChild(div);*/
      this.whatsAppService.getMaxMessageId().subscribe(
        (res) => {
          
          console.log("res: "+res);
          this.id = parseInt(res) + 1;
          console.log("Id++ = "+ this.id );
          this.nM.id = this.id;
          this.nM.message_from = "test0";
          this.nM.message_to =this.roomname;
          this.chatService.sendMessage(this.nM);
          
        }, (err) => {
          console.log(err);
        });

      this.nM.message_text = this.newMessage;
      this.messageList.push('me: ' + this.newMessage);
      this.newMessage = '';
    }}

  }
  ngOnInit() {

    //this.chatService.connect();
    
      this.chatService.getMessage().subscribe((msg) => {

        if(msg === "Update"){
          this.whatsAppService.getChatHistoryFromContactUser(this.roomname).subscribe((res)=>{
            console.log(res);
            // document.querySelector('#message_bubble1').classList.add('message_bubble2');
            if(this.counter !== res[res.length - 1].id){
              this.messageList.push(this.roomname+": "+ res[res.length - 1].message_text);
            }
            
            for(msg in res){
              // for(let key in this.messageList){
              //   let checkMsg: string = 'other contact: '+ res[msg].message_text;
              //   console.log(checkMsg);
              //   if(checkMsg !== key){
              //     this.messageList.push('other contact: '+ res[msg].message_text);
              //   }
              // }
            } 
          },(err)=>{
            console.log(err);
          })
          console.log(msg);
        }
      
      
    })
    // this.chatService.getMessage().subscribe((msg) => { 
    // /*  let element = document.createElement("p");
    //   element.innerHTML = "{{ message }}";
    //   element.id="message_bubble1";
    //   let div = document.getElementById("div_id");
    //   element.appendChild(div);*/
    //   //document.querySelector('div p').id="message_bubble2"
    //   this.messageList.push('other contact: ' + msg.msg);
    //   console.log(msg);
    //   console.log(`from: ${msg.id}`);
    // });
  }

  setChatHistory(){
    this.whatsAppService.getChatHistoryFromContactUser(this.roomname).subscribe((res)=>{
      for(let msg in res){
        this.messageList.push(res[msg].message_text);
      }
      this.counter = res[res.length -1 ].id;
    })
  }
}
