import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { GreetingsService } from './greetings.service';

describe('GIVEN: a GreetingsService', () => {
  describe('WHEN: the DataModule is compiled', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
    });

    it('THEN: should be created', () => {
      const service: GreetingsService = TestBed.get(GreetingsService);
      expect(service).toBeTruthy();
    });

    it(`THEN: should return an observable when call 'getGrettings()'`, () => {
      const service: GreetingsService = TestBed.get(GreetingsService);
      const greetings$: Observable<any> = service.getGrettings$();
      expect(greetings$).toBeInstanceOf(Observable);
    });

    it(`THEN: should return 'Welcome to api!' when call 'getGrettings()'`, async(() => {
      const service: GreetingsService = TestBed.get(GreetingsService);
      service
        .getGrettings$()
        .subscribe(result =>
          expect(result).toEqual({ message: 'Welcome to api!' })
        );
      const httpMock = TestBed.get(HttpTestingController);
      const req = httpMock.expectOne('http://localhost:3333/api');
      req.flush({ message: 'Welcome to api!' });
      httpMock.verify();
    }));
  });
});
