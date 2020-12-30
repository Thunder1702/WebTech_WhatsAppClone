"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent() {
        this.value = '';
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//uploading a photo to the profile page
// window.addEventListener('load', function () {
//   document.querySelector('input[type="file"]').addEventListener('change', function () {
//     if (this.files && this.files[0]) {
//       var img = document.querySelector('img');  // $('img')[0]
//       img.src = URL.createObjectURL(this.files[0]); // set src to blob url
//       //img.onload = imageIsLoaded;
//      }
//   });
// });
