import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  value = '';
  constructor() { }

  ngOnInit(): void {
  }

  //this.whatsAppService.getUser()
  //aus token wird username geholt für den request

  //man bekommt ein json Objekt zurück wo die ganze Zeile des users aus Tabelle users drinnen ist
  //dort kann man dann das Profilbild, denemail und Status rausholen
  //Request für ändern des Fotos und email adresse
  //NAME DARF NICHT GEÄNDERT WERDEN

  url = 'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg';
  onselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
}
