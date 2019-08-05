import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMasterComponent } from './upload-master.component';

describe('UploadMasterComponent', () => {
  let component: UploadMasterComponent;
  let fixture: ComponentFixture<UploadMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
