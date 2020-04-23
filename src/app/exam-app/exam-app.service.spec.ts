import { TestBed } from '@angular/core/testing';

import { ExamAppService } from './exam-app.service';

describe('ExamAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamAppService = TestBed.get(ExamAppService);
    expect(service).toBeTruthy();
  });
});
