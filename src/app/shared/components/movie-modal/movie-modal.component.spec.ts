import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieModalComponent } from 'src/app/app.routes';

describe('MovieModalComponent', () =>
{
  let component: MovieModalComponent;
  let fixture: ComponentFixture<MovieModalComponent>;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      imports: [MovieModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});
