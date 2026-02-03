import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionChargeClient } from './fonction-charge-client';

describe('FonctionChargeClient', () => {
  let component: FonctionChargeClient;
  let fixture: ComponentFixture<FonctionChargeClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonctionChargeClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FonctionChargeClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
