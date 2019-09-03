import { TestBed } from '@angular/core/testing';

import { GreetingsService } from './greetings.service';

describe('GreetingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GreetingsService = TestBed.get(GreetingsService);
    expect(service).toBeTruthy();
  });
});
