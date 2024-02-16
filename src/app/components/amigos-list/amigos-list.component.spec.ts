import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmigosListComponent } from './amigos-list.component';

describe('AmigosListComponent', () => {
  let component: AmigosListComponent;
  let fixture: ComponentFixture<AmigosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmigosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmigosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
