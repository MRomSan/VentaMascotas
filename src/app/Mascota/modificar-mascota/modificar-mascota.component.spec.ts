import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMascotaComponent } from './modificar-mascota.component';

describe('ModificarMascotaComponent', () => {
  let component: ModificarMascotaComponent;
  let fixture: ComponentFixture<ModificarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarMascotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
