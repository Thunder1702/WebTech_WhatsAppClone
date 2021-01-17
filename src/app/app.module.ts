import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  Provider,
} from '@angular/core';
import { AppComponent } from './app.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from './chat.service';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { JwtInterceptor } from './jwtInterceptor';



@NgModule({
  declarations: [
    AppComponent,
    MainChatComponent,
    ProfileComponent,
    ContactListComponent,
    SidebarComponent,
    SigninComponent,
    RegisterComponent,
    ContactPageComponent,
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
    MatButtonModule,
  ],
  providers: [ChatService,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
