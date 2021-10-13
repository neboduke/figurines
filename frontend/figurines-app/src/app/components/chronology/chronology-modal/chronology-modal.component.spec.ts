import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologyModalComponent } from './chronology-modal.component';

describe('ChronologyModalComponent', () => {
  let component: ChronologyModalComponent;
  let fixture: ComponentFixture<ChronologyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronologyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
