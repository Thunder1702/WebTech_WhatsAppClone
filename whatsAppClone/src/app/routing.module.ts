import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactPageComponent } from './contact-page/contact-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: SigninComponent },
  { path: 'signin/register', pathMatch: 'full', redirectTo: 'register' },
  { path: 'register/signin', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'register', component: RegisterComponent },
  { path: 'signin/mainChat', pathMatch: 'full', redirectTo: 'mainChat' },
  { path: 'mainChat' , component: MainChatComponent},
  { path: 'mainChat/logout', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'mainChat/profileSite', pathMatch: 'full', redirectTo: 'profile' },
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/backToMainChat' , pathMatch: 'full', redirectTo: 'mainChat'},
  { path: 'register/mainChat', pathMatch: 'full', redirectTo: 'mainChat' },
  { path: 'mainChat/contact-list', pathMatch: 'full', redirectTo: 'contact-list'},
  { path: 'contact-list' , component: ContactListComponent},
  { path: 'mainChat/contact-page', pathMatch: 'full', redirectTo: 'contact-page'},
  { path: 'contact-page', component: ContactPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

