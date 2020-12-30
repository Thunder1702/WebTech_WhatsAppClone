"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainChatComponent = void 0;
var core_1 = require("@angular/core");
var MainChatComponent = /** @class */ (function () {
    function MainChatComponent(chatService) {
        this.chatService = chatService;
        this.messageList = [];
    }
    MainChatComponent.prototype.sendMessage = function () {
        this.chatService.sendMessage({ id: "1", body: this.newMessage });
        this.newMessage = '';
    };
    MainChatComponent.prototype.ngOnInit = function () {
    };
    MainChatComponent = __decorate([
        core_1.Component({
            selector: 'app-main-chat',
            templateUrl: './main-chat.component.html',
            styleUrls: ['./main-chat.component.css']
        })
    ], MainChatComponent);
    return MainChatComponent;
}());
exports.MainChatComponent = MainChatComponent;
