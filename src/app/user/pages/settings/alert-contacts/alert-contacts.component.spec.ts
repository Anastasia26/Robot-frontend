import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertContactsComponent } from './alert-contacts.component';

describe('AlertContactsComponent', () => {
  let component: AlertContactsComponent;
  let fixture: ComponentFixture<AlertContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
