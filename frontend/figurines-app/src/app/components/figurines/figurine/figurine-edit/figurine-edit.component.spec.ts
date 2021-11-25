import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurineEditComponent } from './figurine-edit.component';

describe('FigurineEditComponent', () => {
  let component: FigurineEditComponent;
  let fixture: ComponentFixture<FigurineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FigurineEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FigurineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
