import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceChargeClient } from './espace-charge-client';

describe('EspaceChargeClient', () => {
  let component: EspaceChargeClient;
  let fixture: ComponentFixture<EspaceChargeClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceChargeClient],
    }).compileComponents();

    fixture = TestBed.createComponent(EspaceChargeClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
