import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieModalCastComponent } from './movie-modal-cast.component';

describe('MovieModalCastComponent', () => {
  let component: MovieModalCastComponent;
  let fixture: ComponentFixture<MovieModalCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieModalCastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieModalCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
