import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  value='';
  constructor() { }

  ngOnInit(): void {
  }

}
//uploading a photo to the profile page

window.addEventListener('load', function () {
  document.querySelector('input[type="file"]').addEventListener('change', function () {
    if (this.files && this.files[0]) {
      var img = document.querySelector('img');  // $('img')[0]
      img.src = URL.createObjectURL(this.files[0]); // set src to blob url
      //img.onload = imageIsLoaded;
     }
  });
});
