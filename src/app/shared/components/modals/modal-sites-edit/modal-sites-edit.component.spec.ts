import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSitesEditComponent } from './modal-sites-edit.component';

describe('ModalSitesEditComponent', () => {
  let component: ModalSitesEditComponent;
  let fixture: ComponentFixture<ModalSitesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSitesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSitesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
