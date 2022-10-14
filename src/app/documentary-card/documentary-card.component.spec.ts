import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryCardComponent } from './documentary-card.component';

describe('DocumentaryCardComponent', () => {
  let component: DocumentaryCardComponent;
  let fixture: ComponentFixture<DocumentaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentaryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
