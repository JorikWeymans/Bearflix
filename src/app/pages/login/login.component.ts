import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
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

  private handleLogin(sender: LoginComponent, response: any)
  {
    if (response) {
      sessionStorage.setItem("LoggedInUser", JSON.stringify(jwtDecode(response.credential)));
      sender.router.navigate(['browse'])
    }
  }
}
