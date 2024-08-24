import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PageLinkComponent } from "../../../shared/components/page-link/page-link.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, PageLinkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent
{
  navList!: string[];

  constructor()
  {
    this.navList = HeaderComponent.navList;
  }
}
