import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkechfabComponent } from './skechfab.component';

describe('SkechfabComponent', () => {
  let component: SkechfabComponent;
  let fixture: ComponentFixture<SkechfabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkechfabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkechfabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
