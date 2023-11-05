import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationWidgetComponent } from './reservation-widget.component';

describe('ReservationWidgetComponent', () => {
  let component: ReservationWidgetComponent;
  let fixture: ComponentFixture<ReservationWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationWidgetComponent]
    });
    fixture = TestBed.createComponent(ReservationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
