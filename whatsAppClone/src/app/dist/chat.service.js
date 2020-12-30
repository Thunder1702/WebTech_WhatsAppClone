"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatService = void 0;
var core_1 = require("@angular/core");
var socket_io_client_1 = require("socket.io-client");
var rxjs_1 = require("rxjs");
var ChatService = /** @class */ (function () {
    function ChatService() {
        this.socket = socket_io_client_1.io('http://localhost:3000');
    }
    ChatService.prototype.sendMessage = function (message) {
        this.socket.emit("sendMessage", message);
    };
    ChatService.prototype.getMessages = function () {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.socket.on('message', function (msg) {
                observer.next(msg);
            });
        });
    };
    ChatService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
