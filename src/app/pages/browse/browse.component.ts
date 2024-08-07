import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent
{
  auth = inject(AuthService)
  name = JSON.parse(sessionStorage.getItem("LoggedInUser")!).name;
  profileImage = JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("LoggedInUser")!).email;

  SignOut()
  {
    sessionStorage.removeItem("LoggedInUser");
    this.auth.signOut();
  }
}
