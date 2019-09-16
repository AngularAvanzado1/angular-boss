import { BehaviorSubject, Observable } from 'rxjs';

export class MiniStore<T> {
  private state: T;
  private _select$ = new BehaviorSubject(this.get());

  constructor(initialState: T) {
    this.set(initialState);
  }

  public set(newSate: T) {
    this.state = { ...newSate };
    this._select$.next(this.get());
  }

  public get(): T {
    return { ...this.state };
  }

  public select$(): Observable<T> {
    return this._select$.asObservable();
  }
}
