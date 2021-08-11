import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaEmpleadoComponent } from './baja-empleado.component';

describe('BajaEmpleadoComponent', () => {
  let component: BajaEmpleadoComponent;
  let fixture: ComponentFixture<BajaEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
