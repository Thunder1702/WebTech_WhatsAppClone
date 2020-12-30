"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var main_chat_component_1 = require("./main-chat/main-chat.component");
var profile_component_1 = require("./profile/profile.component");
var contact_list_component_1 = require("./contact-list/contact-list.component");
var login_component_1 = require("./login/login.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var chatarea_component_1 = require("./chatarea/chatarea.component");
var animations_1 = require("@angular/platform-browser/animations");
var slider_1 = require("@angular/material/slider");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var text_field_1 = require("@angular/cdk/text-field");
var icon_1 = require("@angular/material/icon");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                main_chat_component_1.MainChatComponent,
                profile_component_1.ProfileComponent,
                contact_list_component_1.ContactListComponent,
                login_component_1.LoginComponent,
                sidebar_component_1.SidebarComponent,
                chatarea_component_1.ChatareaComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                platform_browser_1.BrowserModule,
                slider_1.MatSliderModule,
                animations_1.BrowserAnimationsModule,
                input_1.MatInputModule,
                form_field_1.MatFormFieldModule,
                text_field_1.TextFieldModule,
                icon_1.MatIconModule,
                forms_1.FormsModule,
                http_1.HttpClientModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
