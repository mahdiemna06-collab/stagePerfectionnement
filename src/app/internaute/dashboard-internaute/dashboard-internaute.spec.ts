import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInternaute } from './dashboard-internaute';

describe('DashboardInternaute', () => {
  let component: DashboardInternaute;
  let fixture: ComponentFixture<DashboardInternaute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInternaute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardInternaute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
