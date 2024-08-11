import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCarouselItemComponent } from './movie-carousel-item.component';

describe('MovieCarouselItemComponent', () => {
  let component: MovieCarouselItemComponent;
  let fixture: ComponentFixture<MovieCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCarouselItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
