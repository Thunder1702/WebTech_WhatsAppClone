import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatareaComponent } from './chatarea/chatarea.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from './chat.service';


function appInitializerInit(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: (chatService: ChatService) => {
      return () => {
        // load all init promises after cfg loads
        return chatService.connect()
          .then(() => {
            // connect finished
          }).catch(
            (err) => {
              console.log('Error initializing:');
              console.log(err);
            });
      };
    },
    deps: [ChatService],
    multi: true
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MainChatComponent,
    ProfileComponent,
    ContactListComponent,
    SidebarComponent,
    ChatareaComponent,
    SigninComponent,
    RegisterComponent

  ],

  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    ChatService,
    appInitializerInit() // loads chat service
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }



