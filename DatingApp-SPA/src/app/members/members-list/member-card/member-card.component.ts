import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../_models/User';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(private UserSevice: UserService,
    private alertfy: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
  }
  sendLike(id: number) {
    this.UserSevice.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertfy.success('You have liked: ' + this.user.knownAs);
    }, error => {
       this.alertfy.error(error);
    });
  }
}
