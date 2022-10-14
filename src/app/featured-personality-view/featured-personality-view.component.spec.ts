import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPersonalityViewComponent } from './featured-personality-view.component';

describe('FeaturedPersonalityViewComponent', () => {
  let component: FeaturedPersonalityViewComponent;
  let fixture: ComponentFixture<FeaturedPersonalityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedPersonalityViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedPersonalityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
