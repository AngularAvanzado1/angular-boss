import { BehaviorSubject, Observable } from 'rxjs';

export class MiniStore<T> {
  private state: T;
  private select$ = new BehaviorSubject(this.Get());

  constructor(initialState: T) {
    this.Set(initialState);
  }

  public Set(newSate: T) {
    this.state = { ...newSate };
    this.select$.next(this.Get());
  }

  public Get(): T {
    return { ...this.state };
  }

  public Select$(): Observable<T> {
    return this.select$.asObservable();
  }
}
