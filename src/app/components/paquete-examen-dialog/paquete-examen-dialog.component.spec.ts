import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteExamenDialogComponent } from './paquete-examen-dialog.component';

describe('PaqueteExamenDialogComponent', () => {
  let component: PaqueteExamenDialogComponent;
  let fixture: ComponentFixture<PaqueteExamenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaqueteExamenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaqueteExamenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
