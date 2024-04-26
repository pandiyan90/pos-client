import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin = false;
  constructor(private authenticateServie: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
  const result = this.authenticateServie.login(form);
  if (result) {
      this.router.navigate(['/orders']);
    } else {
      this.invalidLogin = true;
      console.log('failed login attempt');
    }
  }
}

