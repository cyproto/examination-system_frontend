import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAppComponent } from './exam-app.component';

describe('ExamAppComponent', () => {
  let component: ExamAppComponent;
  let fixture: ComponentFixture<ExamAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
