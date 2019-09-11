import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsingMenuAccessComponent } from './asing-menu-access.component';

describe('AsingMenuAccessComponent', () => {
  let component: AsingMenuAccessComponent;
  let fixture: ComponentFixture<AsingMenuAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsingMenuAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsingMenuAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
