import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSplitUpComponent } from './payment-split-up.component';

describe('PaymentSplitUpComponent', () => {
  let component: PaymentSplitUpComponent;
  let fixture: ComponentFixture<PaymentSplitUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSplitUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSplitUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
