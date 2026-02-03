import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurDeBanque } from './utilisateur-de-banque';

describe('UtilisateurDeBanque', () => {
  let component: UtilisateurDeBanque;
  let fixture: ComponentFixture<UtilisateurDeBanque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilisateurDeBanque]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateurDeBanque);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
