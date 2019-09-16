import { BehaviorSubject, Observable } from 'rxjs';

export class RxStore<T> {
  private state: T;
  private _select$ = new BehaviorSubject(this.get());

  constructor(initialState: T, private reductor: reducer<T>) {
    this.set(initialState);
  }

  private set(newSate: T) {
    this.state = { ...newSate };
    this._select$.next(this.get());
  }

  public get(): T {
    return { ...this.state };
  }

  public select$(): Observable<T> {
    return this._select$.asObservable();
  }

  public dispatch(action: Action) {
    const curretState = this.get();
    const newState = this.reductor(curretState, action);
    this.set(newState);
  }
}

export class Action {
  public type: string;
  public payload: any;
}

export type reducer<T> = (state: T, action: Action) => T;
