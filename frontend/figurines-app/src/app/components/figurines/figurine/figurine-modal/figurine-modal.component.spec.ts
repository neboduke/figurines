import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurineModalComponent } from './figurine-modal.component';

describe('FigurineModalComponent', () => {
  let component: FigurineModalComponent;
  let fixture: ComponentFixture<FigurineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FigurineModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FigurineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
