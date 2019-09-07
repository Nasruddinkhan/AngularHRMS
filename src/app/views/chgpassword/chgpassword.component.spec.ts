import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChgpasswordComponent } from './chgpassword.component';

describe('ChgpasswordComponent', () => {
  let component: ChgpasswordComponent;
  let fixture: ComponentFixture<ChgpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChgpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChgpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
