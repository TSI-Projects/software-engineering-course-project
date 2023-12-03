import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsFilterComponent } from './rooms-filter.component';

describe('RoomsFilterComponent', () => {
  let component: RoomsFilterComponent;
  let fixture: ComponentFixture<RoomsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsFilterComponent]
    });
    fixture = TestBed.createComponent(RoomsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
