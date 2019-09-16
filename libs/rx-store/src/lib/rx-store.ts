import { BehaviorSubject, Observable } from 'rxjs';

export class RxStore<T> {
  private state: T;
  private subject$ = new BehaviorSubject<T>(this.get());

  constructor(initialState: T, private reducer: reducerFunction<T>) {
    this.set(initialState);
  }

  public select$(): Observable<T> {
    return this.subject$.asObservable();
  }

  public dispatch(action: Action) {
    const curretState = this.get();
    const newState = this.reducer(curretState, action);
    this.set(newState);
  }

  private get(): T {
    return { ...this.state };
  }

  private set(newSate: T) {
    this.state = { ...newSate };
    this.subject$.next(this.get());
  }
}

export interface Action {
  type: string;
  payload: any;
}

export type reducerFunction<T> = (state: T, action: Action) => T;
