import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMascotaFormComponent } from './modificar-mascota-form.component';

describe('ModificarMascotaFormComponent', () => {
  let component: ModificarMascotaFormComponent;
  let fixture: ComponentFixture<ModificarMascotaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarMascotaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMascotaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
