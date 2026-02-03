import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosServices } from './nos-services';

describe('NosServices', () => {
  let component: NosServices;
  let fixture: ComponentFixture<NosServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
