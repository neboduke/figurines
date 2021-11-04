import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteratureModalComponent } from './literature-modal.component';

describe('LiteratureModalComponent', () => {
  let component: LiteratureModalComponent;
  let fixture: ComponentFixture<LiteratureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiteratureModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiteratureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
