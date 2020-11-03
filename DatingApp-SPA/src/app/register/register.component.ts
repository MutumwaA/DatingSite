import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private authservice: AuthService, private alertify: AlertifyService,
              private toastr: ToastrService) { }

  ngOnInit()
  {
  }
  register()
  {
    this.authservice.register(this.model).subscribe(() => {
      this.alertify.success('Registration Successful');
    }, error => {
      this.alertify.error(error);
    });
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }

}
