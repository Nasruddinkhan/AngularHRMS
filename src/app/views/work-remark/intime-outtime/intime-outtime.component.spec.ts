import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntimeOuttimeComponent } from './intime-outtime.component';

describe('IntimeOuttimeComponent', () => {
  let component: IntimeOuttimeComponent;
  let fixture: ComponentFixture<IntimeOuttimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntimeOuttimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntimeOuttimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
