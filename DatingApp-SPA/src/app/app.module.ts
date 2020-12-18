import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './_services/auth.service';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app/routes';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MemberCardComponent } from './members/members-list/member-card/member-card.component';
import { MemberDetailComponent } from './members/members-list/member-detail/member-detail.component';
import { MemberEditComponent } from './members/members-list/member-edit/member-edit.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemmberEditResolver } from './_resolvers/member-edit.resolver';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import {ToastrModule} from 'ngx-toastr';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

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
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent  
   ],
   imports: [
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      FileUploadModule,
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right'
      }),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter ,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/api/auth/']
         }
      }),
      NgxGalleryModule
   ],
   providers: [
      ErrorInterceptorProvider,
      AlertifyService,
      AuthService,
      MemberDetailResolver,
      MemberListResolver,
      MemmberEditResolver,
      PreventUnsavedChanges
      ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
