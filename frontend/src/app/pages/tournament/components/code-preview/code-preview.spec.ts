import { TestBed } from '@angular/core/testing';

import { CodePreview } from './code-preview';

describe('CodePreview', () => {
  let service: CodePreview;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodePreview);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
