import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilesBoxComponent } from './upload-files-box.component';

describe('UploadFilesBoxComponent', () => {
  let component: UploadFilesBoxComponent;
  let fixture: ComponentFixture<UploadFilesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFilesBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
