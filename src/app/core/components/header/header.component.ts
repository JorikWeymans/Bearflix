import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PageLinkComponent } from "../../../shared/components/page-link/page-link.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, PageLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent
{
  static navList = ["Home", "Recomendations", "Classical", "Popular"]
  navList!: string[];

  @Input({ required: true }) userImage: string = '';
  @Input({ required: true }) name: string = '';

  constructor()
  {
    this.navList = HeaderComponent.navList;
  }

}
