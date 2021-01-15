import { Component, OnInit } from '@angular/core';
import { WhatsAppService } from '../whatsApp.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private whatsAppService: WhatsAppService) { }

  ngOnInit(): void {
    this.whatsAppService.getUser().subscribe((res) => {
      console.log(res);
      document.querySelector('#name').setAttribute('value',res[0].name);
      document.querySelector('#email').setAttribute('value',res[0].email);
    }, (err) => {
      console.log(err);
    })
  }

  //man bekommt ein json Objekt zurück wo die ganze Zeile des users aus Tabelle users drinnen ist
  //dort kann man dann das Profilbild, denemail und Status rausholen
  //Request für ändern des Fotos 
 

  url = 'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg';
  onselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(e.target.files[0].name); //gibt bild_3.jpg aus 
        //Name des Bilde als url in die Db speichern
        //bei ngonInit einen request an server schicken, der bild zurück geben soll
        
      }
    }
  }
}
