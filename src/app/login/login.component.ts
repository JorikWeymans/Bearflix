declare var google: any;

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

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

  ngOnInit(): void
  {
    google.accounts.id.initialize({
      client_id: '152883696216-mistirreo1g2r48kabshjqjt6trg3cfs.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodeToken(token: string)
  {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any)
  {
    if (response) {
      const payLoad = this.decodeToken(response.credential);

      sessionStorage.setItem("LoggedInUser", JSON.stringify(payLoad));

      this.router.navigate(['browse'])
    }
  }
}
