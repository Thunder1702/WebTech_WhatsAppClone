import { Component, OnInit } from '@angular/core';
import { Photo } from '../model/photos';
import { WhatsAppService } from '../whatsApp.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  url;
  nP = new Photo;
  constructor(private whatsAppService: WhatsAppService) { }

  ngOnInit(): void {
    this.whatsAppService.getUser().subscribe((res) => {
      console.log(res);
      document.querySelector('#name').setAttribute('value',res[0].name);
      document.querySelector('#email').setAttribute('value',res[0].email);
    }, (err) => {
      console.log(err);
    });

    this.whatsAppService.getImageUser().subscribe((res)=>{
      console.log("res: "+res);
      if(res === ""){
        this.url = environment.baseURL+'/whatsAppClone_Service/profilBilder/default.jpg';
      }else{
        this.url =environment.baseURL+"/whatsAppClone_Service/profilBilder/"+ res;
      }
    },(err)=>{
      console.log("ERROR in getImage");
      console.log(err);
    });
  }

  
  onselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log("Ausgewähltes Bild: "+e.target.files[0].name); 
        this.nP.uploaded_by = 'username';
        this.nP.url = e.target.files[0].name;
        this.whatsAppService.uploadPhoto(this.nP).subscribe((res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });

      
        
      }
    }
  }
}
