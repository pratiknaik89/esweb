import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvnolopeComponent } from './evnolope.component';

describe('EvnolopeComponent', () => {
  let component: EvnolopeComponent;
  let fixture: ComponentFixture<EvnolopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvnolopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvnolopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
