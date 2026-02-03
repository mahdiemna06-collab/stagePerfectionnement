import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceChargeCredit } from './espace-charge-credit';

describe('EspaceChargeCredit', () => {
  let component: EspaceChargeCredit;
  let fixture: ComponentFixture<EspaceChargeCredit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceChargeCredit],
    }).compileComponents();

    fixture = TestBed.createComponent(EspaceChargeCredit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
