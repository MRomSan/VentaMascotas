import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEmpleadoFormComponent } from './modificar-empleado-form.component';

describe('ModificarEmpleadoFormComponent', () => {
  let component: ModificarEmpleadoFormComponent;
  let fixture: ComponentFixture<ModificarEmpleadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarEmpleadoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarEmpleadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
