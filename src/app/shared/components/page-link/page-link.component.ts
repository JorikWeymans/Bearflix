import { ViewportScroller } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-page-link',
  standalone: true,
  imports: [],
  templateUrl: './page-link.component.html',
})
export class PageLinkComponent
{
  @Input({ required: false }) text: string = '';
  @Input({ required: false }) to: string = '';
  @Input({ required: false }) offset: number = 0;

  scroller = inject(ViewportScroller);


  public onClick()
  {
    if (this.text === '' && this.to === '') return;

    this.scroller.setOffset([0, this.offset]);
    this.scroller.scrollToAnchor(this.to === '' ? this.text : this.to);
  }
}
