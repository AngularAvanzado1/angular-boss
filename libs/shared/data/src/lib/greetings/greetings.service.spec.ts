import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { GreetingsService } from './greetings.service';

describe('GIVEN: an GreetingsService', () => {
  let httpMock: HttpTestingController;
  let service: GreetingsService;
  describe('WHEN: the DataModule is compiled', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [GreetingsService]
      });
    });

    beforeEach(inject(
      [GreetingsService, HttpTestingController],
      (_service, _httpMock) => {
        service = _service;
        httpMock = _httpMock;
      }
    ));

    it('THEN: should be created', () => {
      //const service: GreetingsService = TestBed.get(GreetingsService);
      expect(service).toBeTruthy();
    });

    it(`THEN: should return an observable when call 'getGrettings()'`, () => {
      //const service: GreetingsService = TestBed.get(GreetingsService);
      const greetings$: Observable<any> = service.getGrettings$();
      expect(greetings$).toBeTruthy();
    });

    it(`THEN: should return 'Welcome to api!' when call 'getGrettings()'`, async(() => {
      service
        .getGrettings$()
        .subscribe(result => expect(result).toEqual({ message: 'hello' }));
      const req = httpMock.expectOne('http://localhost:3333/api');

      req.flush({ message: 'hello' });
      httpMock.verify();
    }));
  });
});
