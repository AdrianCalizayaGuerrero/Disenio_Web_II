import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaniolComponent } from './espaniol.component';

describe('EspaniolComponent', () => {
  let component: EspaniolComponent;
  let fixture: ComponentFixture<EspaniolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaniolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaniolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
