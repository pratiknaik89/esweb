import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridconfigComponent } from './gridconfig.component';

describe('GridconfigComponent', () => {
  let component: GridconfigComponent;
  let fixture: ComponentFixture<GridconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
