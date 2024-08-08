import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit
{
  private router = inject(Router);
  private authService: AuthService;

  public constructor(authService: AuthService)
  {
    this.authService = authService;
  }

  ngOnInit(): void
  {
    if (document.readyState === 'complete') {
      this.authService.initialize(this, document.getElementById("google-btn"), this.handleLogin);
    }
    else {
      window.onload = () =>
      {
        this.authService.initialize(this, document.getElementById("google-btn"), this.handleLogin);
      }
    }
  }

  private decodeToken(token: string)
  {
    return JSON.parse(atob(token.split(".")[1]));
  }

  private handleLogin(sender: LoginComponent, response: any)
  {
    if (response) {
      const payLoad = sender.decodeToken(response.credential);
      sessionStorage.setItem("LoggedInUser", JSON.stringify(payLoad));

      sender.router.navigate(['browse'])
    }
  }
}
