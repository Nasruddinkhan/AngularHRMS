import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EductionDetailsComponent } from './eduction-details.component';

describe('EductionDetailsComponent', () => {
  let component: EductionDetailsComponent;
  let fixture: ComponentFixture<EductionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EductionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EductionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
