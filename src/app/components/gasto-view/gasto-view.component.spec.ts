import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoViewComponent } from './gasto-view.component';

describe('GastoViewComponent', () => {
  let component: GastoViewComponent;
  let fixture: ComponentFixture<GastoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GastoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
