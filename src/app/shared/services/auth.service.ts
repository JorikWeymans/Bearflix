declare var google: any;

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  router = inject(Router)
  constructor() { }

  public signOut(): void
  {
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
  }

  public initialize(sender: any, buttonDiv: HTMLElement | null, onLoggedIn: (sender: any, resp: any) => void): void
  {
    google.accounts.id.initialize({
      client_id: '152883696216-mistirreo1g2r48kabshjqjt6trg3cfs.apps.googleusercontent.com',
      callback: (resp: any) => onLoggedIn(sender, resp)
    });

    google.accounts.id.renderButton(buttonDiv, {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    });
  }

}


