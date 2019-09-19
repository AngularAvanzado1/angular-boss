title: 5-NgRx
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Redux con NgRx

---

    # 1. Instalación y configuración
    # 2. Actions
    # 3. Reducers
    # 4. Selectors
    # 5. Effects


---

```yaml
As a: developer,
  I want: to use logging tools
  so that: I can debug the application better

As a: devoloper,
  I want: to have a set of allowed actions
  so that: I can get help while developing

As a: developer,
  I want: to query my state in a reactive way
  so that: I can be notified of any changes nay time

As a: developer,
  I want: to use send, chain and forget actions
  so that: I can make asynchronous calls
```

---

[NgRx: Reactive State for Angular](https://ngrx.io/)

### Inspirada en Redux

### Basada en RxJS

### Estándar de facto,

### Herramientas de generación de código

### Modular y extensible.

---

Mantra para Redux:

> Redux no hace rápido lo simple, sino mantenible lo complejo

--

Mantra Redux con NgRx:

> NgRx no hace rápido a Redux, sino mantenible el boilerplate




---

class: impact

# 1 Instalación y configuración

## Instalación de NgRx
## DevTools
## Router

---

## 1.1 Instalación de NgRx

```bash
ng g @nrwl/angular:ngrx app --module=apps/shop/src/app/app.module.ts --root --minimal

```
---

## 1.2 DevTools

```bash
# https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
```

---

## 1.3 Router

```typescript
StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal })
StoreModule.forRoot(
      {
        router: routerReducer
      },...
```

---

> Recap:

# 1 Instalación y configuración

## Instalación de NgRx
## DevTools
## Router

---

class: impact

# 2 Actions

## Create
## Dispatch

---

Address o Payments

```yaml
As a: customer,
  I want: to add payment methods
  so that: I can pay with them

As a: customer,
  I want: to select one as preferred
  so that: I can make fewer clicks

As a: customer,
  I want: to change de expiration date
  so that: I get my cards up to date
```

---

## Create

```bash
ng g m payments --project=shop --module=app.module.ts --routing --route=payments
ng g @ngrx/schematics:feature payments/store/paymentMethod --project=shop --module=payments/payments.module.ts --no-flat --no-spec --creators
```

`apps\shop\src\app\payments\store\payment-method\payment-method.model.ts`

```typescript
export interface PaymentMethod {
  id: string;
  expiration: Date;
}

export interface PaymentMethods {
  list: PaymentMethod[];
  preferred: string;
}
```

---

`apps\shop\src\app\payments\store\payment-method\payment-method.actions.ts`

```typescript
export const loadPaymentMethods = createAction(
  '[PaymentMethod] Load PaymentMethods'
);

export const addPaymentMethod = createAction(
  '[PaymentMethod] Add PaymentMethod',
  props<{ newPaymentMethod: PaymentMethod }>()
);

export const selectPreferredPaymentMethod = createAction(
  '[PaymentMethod] Select preferred PaymentMethod',
  props<{ preferredId: string }>()
);

export const setExpirationPaymentMethod = createAction(
  '[PaymentMethod] Set Expiration Date on PaymentMethod',
  props<{ updatedPaymentMethod: PaymentMethod }>()
);
```

---

## Dispatch

`apps\shop\src\app\payments\store\payment-method\payment-method.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PaymentMethodActions from './payment-method.actions';
import {
  PaymentMethod,
  PaymentMethods
} from './payment-method.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodFacade {
  constructor(private store: Store<PaymentMethods>) {}
}
```

---

```typescript
public loadPaymentMethods() {
  this.store.dispatch(PaymentMethodActions.loadPaymentMethods());
}
public addPaymentMethod(newPaymentMethod: PaymentMethod) {
    this.store.dispatch(
      PaymentMethodActions.addPaymentMethod({
        newPaymentMethod: { ...newPaymentMethod }
      })
    );
  }
public selectPreferredPaymentMethod(preferredId: string) {
  this.store.dispatch(
    PaymentMethodActions.selectPreferredPaymentMethod({ preferredId })
  );
}
public setExpirationPaymentMethod(updatedPaymentMethod: PaymentMethod) {
  this.store.dispatch(
    PaymentMethodActions.setExpirationPaymentMethod({
      updatedPaymentMethod: { ...updatedPaymentMethod }
    })
  );
}
```

---

`apps\shop\src\app\payments\payments.component.ts`

```typescript
export class PaymentsComponent implements OnInit {
  constructor(private paymentMethodService: PaymentMethodService) {}

  ngOnInit() {
    this.paymentMethodService.loadPaymentMethods();
    const visa: PaymentMethod = {
      id: '1234 7896 3214 6549',
      expiration: new Date(2020, 6-1, 30)
    };
    this.paymentMethodService.addPaymentMethod(visa);
    this.paymentMethodService.selectPreferredPaymentMethod(visa.id);
    visa.expiration = new Date(2021, 12-1, 31);
    this.paymentMethodService.setExpirationPaymentMethod(visa);
  }
}
```

---

> Recap:

# 2 Actions

## Create
## Dispatch

---

class: impact

# 3 State reducer

## State
## Create function
## Register in Store
---

## State

`apps\shop\src\app\payments\store\payment-method\payment-method.reducer.ts`

```typescript
export interface State {
  paymentMethods: PaymentMethods;
}

export const initialState: State = {
  paymentMethods: { list: [], preferred: null }
};
```
---

## Create function

```typescript
const paymentMethodReducer = createReducer(
  initialState,
  on(PaymentMethodActions.loadPaymentMethods, state => state)
);
```
---

```typescript
on(PaymentMethodActions.addPaymentMethod, (state, { newPaymentMethod }) => {
  return {
    ...state,
    paymentMethods: {
      ...state.paymentMethods,
      list: [...state.paymentMethods.list, newPaymentMethod]
    }
  };
})
```
---

```typescript
on(
  PaymentMethodActions.selectPreferredPaymentMethod,
  (state, { preferredId }) => {
    return {
      ...state,
      paymentMethods: { ...state.paymentMethods, preferred: preferredId }
    };
  }
)
```

---

```typescript
on(
  PaymentMethodActions.setExpirationPaymentMethod,
  (state, { updatedPaymentMethod }) => {
    const list = state.paymentMethods.list;
    const updatedlist = list.map(pM =>
      pM.id === updatedPaymentMethod.id ? updatedPaymentMethod : pM
    );
    return {
      ...state,
      paymentMethods: {
        ...state.paymentMethods,
        list: updatedlist
      }
    };
  }
)
```

---
## Register in Store

`apps\shop\src\app\payments\store\payment-method\payment-method.reducer.ts`

```typescript
export function reducer(state: State | undefined, action: Action) {
  return paymentMethodReducer(state, action);
}
```

`apps\shop\src\app\payments\payments.module.ts`

```typescript
import * as fromPaymentMethod from './store/payment-method/payment-method.reducer';
@NgModule({
  imports: [
    StoreModule.forFeature(
      fromPaymentMethod.paymentMethodFeatureKey,
      fromPaymentMethod.reducer
    )]
```

---

> Recap:

# 3 State reducer

## State
## Create function
## Register in Store

---

class: impact

# 4 Selectors

## Create selector
## Selecting data
## Showing data

---

## Create selector

`apps\shop\src\app\payments\store\payment-method\payment-method.selectors.ts`

```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { paymentMethodFeatureKey, State } from './payment-method.reducer';

export const getPaymentMethodState = createFeatureSelector<State>(
  paymentMethodFeatureKey
);

export const getPaymentMethodsList = createSelector(
  getPaymentMethodState,
  (state: State) => state.paymentMethods.list
);

export const getPreferredPaymentMethod = createSelector(
  getPaymentMethodState,
  (state: State) => state.paymentMethods.preferred
);
```

---

## Selecting data

```typescript
  public getPaymentMethodsList$(): Observable<PaymentMethod[]> {
    return this.store.select(PaymentMethodSelectors.getPaymentMethodsList);
  }

  public getPreferredPaymentMethod$(): Observable<string> {
    return this.store.select(PaymentMethodSelectors.getPreferredPaymentMethod);
  }
```

---

## Showing data

```typescript
export class PaymentsComponent implements OnInit {
  public paymentMethodsList$: Observable<PaymentMethod[]>;
  public preferredPaymentMethod$: Observable<string>;
  constructor(private paymentMethodService: PaymentMethodService) {}

  ngOnInit() {
    this.paymentMethodsList$ = this.paymentMethodService.getPaymentMethodsList$();
    this.preferredPaymentMethod$ = this.paymentMethodService.getPreferredPaymentMethod$();
  }
}
```

```html
<p>Payment Methods List:</p>
<pre>{{ paymentMethodsList$ | async | json }}</pre>
<p>Preferred Payment Method:</p>
<pre>{{ preferredPaymentMethod$ | async | json }}</pre>
```

---

> Recap:

# 4 Selectors

## Create selector
## Selecting data
## Fachadas

---

class: impact

# 5 Effects

## Install
## Efecto básico
## Api async

---

## Install

```
yarn add @ngrx/effects
```

---

## Efecto básico


### Acciones

`apps\shop\src\app\payments\store\payment-method\payment-method.actions.ts`

```typescript
export const loadPaymentMethods = createAction(
  '[PaymentMethod] Load Payment Methods'
);

export const loadPaymentMethodsSucess = createAction(
  '[PaymentMethod] Load Payment Methods Success',
  props<{ paymentMethodList: PaymentMethod[] }>()
);

export const loadPaymentMethodsError = createAction(
  '[PaymentMethod] Load Payment Methods Error'
);
```

---

### Definición

`apps\shop\src\app\payments\store\payment-method\payment-method.effects.ts`

```typescript
public loadPaymentMethods$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PaymentMethodActions.loadPaymentMethods),
    concatMap(() => {
      try {
        let storedList = JSON.parse(
          window.localStorage.getItem(this.storeKey)
        );
        if (!storedList) {
          storedList = initialState.paymentMethods.list;
          window.localStorage.setItem(
            this.storeKey,
            JSON.stringify(storedList)
          );
        }
        return of(
          PaymentMethodActions.loadPaymentMethodsSucess({
            paymentMethodList: storedList
          })
        );
      } catch (e) {
        return of(PaymentMethodActions.loadPaymentMethodsError);
      }
    })
  )
);
```

---

### Reducer y Register

`apps\shop\src\app\payments\store\payment-method\payment-method.reducer.ts`

```typescript
on(
    PaymentMethodActions.loadPaymentMethodsSucess,
    (state, { paymentMethodList }) => {
      return {
        ...state,
        paymentMethods: { ...state.paymentMethods, list: paymentMethodList }
      };
    }
  ),
  on(PaymentMethodActions.loadPaymentMethodsError, state => state),
```

`apps\shop\src\app\payments\payments.module.ts`

```typescript
EffectsModule.forFeature([PaymentMethodEffects])
```

---

### Otro más sin reacciones

`apps\shop\src\app\payments\store\payment-method\payment-method.effects.ts`

```typescript
  public addPaymentMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentMethodActions.addPaymentMethod),
      concatMap(action => {
        try {
          let storedList = JSON.parse(
            window.localStorage.getItem(this.storeKey)
          );
          storedList = [...storedList, action.newPaymentMethod];
          window.localStorage.setItem(
            this.storeKey,
            JSON.stringify(storedList)
          );
          return EMPTY;
        } catch (e) {
          return EMPTY;
        }
      })
    )
  );
```

---

## Api async effects

```yaml
As a: customer,
  I want: to see the current exchange rate in several currencies
  so that: I can decide
```

---


```typescript
// shopping-cart.actions.ts
export const loadShoppingCart = createAction(
  '[Application Start] Load Shopping Cart',
  props<{}>()
);

export const shoppingCartLoaded = createAction(
  '[ShoppingCart Effects] Shopping Cart Loaded',
  props<{ loadedShoppingCart: ShoppingCart }>()
);

export const shoppingCartErrorLoading = createAction(
  '[ShoppingCart Effects] Shopping Cart Error Loading',
  props<{ error: string }>()
);
```

---

```typescript
//shopping-cart.effects.ts

public loadShoppingCart$ = createEffect(this.loadShoppingCart.bind(this));

private loadShoppingCart() {
  return this.actions$.pipe(
    ofType(loadShoppingCart),
    switchMap(() =>
      this.cartService.getShoppingCart().pipe(
        map(result => shoppingCartLoaded({ loadedShoppingCart: result })),
        catchError(error => of(shoppingCartErrorLoading({ error: error.message })))
      )
    )
  );
}
```

---

```typescript
// shopping-cart.reducer.ts
export const shoppingCartReducer = createReducer(
  initialState,
   on(shoppingCartLoaded, onShoppingCartLoaded),
   on(shoppingCartErrorLoading, onApiError)
);

function onShoppingCartLoaded(state: ShoppingCart, { loadedShoppingCart }) {
  return loadedShoppingCart;
}
function onApiError(state: ShoppingCart, { error }) {
  return { ...state, error: error };
}
```

---

```typescript
// shell.component.ts
public loadShoppingCart(){
  const action = loadShoppingCart({});
  this.store.dispatch(action);
}
```

---


---

> Recap:

# 5 Effects

## Install
## Efecto básico
## Api async effects

---

> Next:

# Deploy Progressive Web Apps

## Angular Service Worker con el CLI
## Configuración de caché
## Actualizaciones y notificaciones


> **Blog de apoyo:** [Detección del cambio en Angular](https://academia-binaria.com/deteccion-del-cambio-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
