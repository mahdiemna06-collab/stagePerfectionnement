import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionChargeCredit } from './fonction-charge-credit';

describe('FonctionChargeCredit', () => {
  let component: FonctionChargeCredit;
  let fixture: ComponentFixture<FonctionChargeCredit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonctionChargeCredit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FonctionChargeCredit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
