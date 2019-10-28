import { async, TestBed } from '@angular/core/testing';
import { CurrencyModule } from './currency.module';

describe('CurrencyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CurrencyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CurrencyModule).toBeDefined();
  });
});
