import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {
  users: User[];
  constructor(private UserSevice: UserService,
    private alertfy: AlertifyService,private route: ActivatedRoute
    ) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
      this.users = data['users'];
      });
      }
  // loadUsers()
  // {
  //   this.UserSevice.getUsers().subscribe((users: User[]) => {
  //   this.users = users;
  //   },error => {
  //   this.alertfy.error(error); 
  //   });
  // }
}

