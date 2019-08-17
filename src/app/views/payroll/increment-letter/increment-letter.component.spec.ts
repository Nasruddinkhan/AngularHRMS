import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementLetterComponent } from './increment-letter.component';

describe('IncrementLetterComponent', () => {
  let component: IncrementLetterComponent;
  let fixture: ComponentFixture<IncrementLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrementLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
