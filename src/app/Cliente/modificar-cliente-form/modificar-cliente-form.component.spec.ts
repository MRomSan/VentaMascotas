import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarClienteFormComponent } from './modificar-cliente-form.component';

describe('ModificarClienteFormComponent', () => {
  let component: ModificarClienteFormComponent;
  let fixture: ComponentFixture<ModificarClienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarClienteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
