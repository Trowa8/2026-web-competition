import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { registerResolver } from './register-resolver';

describe('registerResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => registerResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
