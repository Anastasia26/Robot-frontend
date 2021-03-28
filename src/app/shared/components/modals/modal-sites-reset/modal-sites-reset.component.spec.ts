import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSitesResetComponent } from './modal-sites-reset.component';

describe('ModalSitesResetComponent', () => {
  let component: ModalSitesResetComponent;
  let fixture: ComponentFixture<ModalSitesResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSitesResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSitesResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
