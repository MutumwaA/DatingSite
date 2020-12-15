import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import {MessagesComponent} from './messages/messages.component';
import {ListsComponent} from './lists/lists.component';
import { MemberDetailComponent } from './members/members-list/member-detail/member-detail.component';
import {AuthGuard} from './_guards/auth.guard';
import { MemmberListResolver } from './_resolvers/member-list.resolver';
import { MemmberDetailResolver } from './_resolvers/member-detail.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
        {path: 'members' , component: MembersListComponent
        , resolve: {users: MemmberListResolver }},
        {path: 'members/:id' , component: MemberDetailComponent
        , resolve: {user: MemmberDetailResolver}},
        {path: 'messages', component: MessagesComponent},
        {path: 'lists', component: ListsComponent},
    ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
]