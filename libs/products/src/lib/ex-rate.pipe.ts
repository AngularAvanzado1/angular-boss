import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Pipe({
  name: 'exRate'
})
export class ExRatePipe implements PipeTransform {
  private readonly euroDollars = 1.13;
  private readonly ratesApi = 'https://api.exchangeratesapi.io/latest?symbols=';

  constructor(private httpClient: HttpClient) {}

  public transform(euros: number, symbol: string): number | Observable<number> {
    if (!symbol) {
      return euros * this.euroDollars;
    } else {
      return this.getOnlineRates$(symbol).pipe(map(rate => euros * rate));
    }
  }

  private getOnlineRates$(symbol: string) {
    const ratesUrl = this.ratesApi + symbol;
    return this.httpClient.get<any>(ratesUrl).pipe(
      shareReplay(1),
      // refCount(),
      map(resp => resp.rates[symbol])
    );
  }
}
