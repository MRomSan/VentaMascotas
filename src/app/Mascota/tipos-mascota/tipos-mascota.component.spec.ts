import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposMascotaComponent } from './tipos-mascota.component';

describe('TiposMascotaComponent', () => {
  let component: TiposMascotaComponent;
  let fixture: ComponentFixture<TiposMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposMascotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
