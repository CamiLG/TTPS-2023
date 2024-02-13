import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoAddComponent } from './gasto-add.component';

describe('GastoAddComponent', () => {
  let component: GastoAddComponent;
  let fixture: ComponentFixture<GastoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GastoAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
