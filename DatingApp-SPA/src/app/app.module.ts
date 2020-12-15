import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from './_services/auth.service';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app/routes';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MemberCardComponent } from './members/members-list/member-card/member-card.component';
import { MemberDetailComponent } from './members/members-list/member-detail/member-detail.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemmberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemmberListResolver } from './_resolvers/member-list.resolver';

import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import {ToastrModule} from 'ngx-toastr';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MessagesComponent,
      MembersListComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      BrowserModule,
      HttpClientModule,
      FormsModule,
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right'
      }),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter ,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/api/auth']
         }
      }),
      NgxGalleryModule
   ],
   providers: [
      ErrorInterceptorProvider,
      AlertifyService,
      AuthService,
      MemmberDetailResolver,
      MemmberListResolver
      ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
