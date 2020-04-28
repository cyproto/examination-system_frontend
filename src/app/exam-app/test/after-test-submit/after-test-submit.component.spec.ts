import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterTestSubmitComponent } from './after-test-submit.component';

describe('AfterTestSubmitComponent', () => {
  let component: AfterTestSubmitComponent;
  let fixture: ComponentFixture<AfterTestSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterTestSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterTestSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
