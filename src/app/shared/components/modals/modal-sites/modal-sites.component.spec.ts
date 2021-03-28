import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSitesComponent } from './modal-sites.component';

describe('ModalSitesComponent', () => {
  let component: ModalSitesComponent;
  let fixture: ComponentFixture<ModalSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
