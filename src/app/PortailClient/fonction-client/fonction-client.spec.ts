import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionClient } from './fonction-client';

describe('FonctionClient', () => {
  let component: FonctionClient;
  let fixture: ComponentFixture<FonctionClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonctionClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FonctionClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
