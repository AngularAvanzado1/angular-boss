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
export interface Payment {
  id: string;
  expiration: Date;
}

export interface RegisteredPaymentMethods {
  list: Payment[];
  preferred: string;
}
```

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
  '[PaymentMethod] Add PaymentMethod',
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
  RegisteredPaymentMethods
} from './payment-method.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodFacade {
  constructor(private store: Store<RegisteredPaymentMethods>) {}
  public loadPaymentMethods() {
    this.store.dispatch(PaymentMethodActions.loadPaymentMethods());
  }
  public addPaymentMethod(paymentMethod: PaymentMethod) {
    this.store.dispatch(
      PaymentMethodActions.addPaymentMethod({ newPaymentMethod: paymentMethod })
    );
  }
  public selectPreferredPaymentMethod(preferredId: string) {
    this.store.dispatch(
      PaymentMethodActions.selectPreferredPaymentMethod({ preferredId })
    );
  }
  public setExpirationPaymentMethod(paymentMethod: PaymentMethod) {
    this.store.dispatch(
      PaymentMethodActions.setExpirationPaymentMethod({
        updatedPaymentMethod: paymentMethod
      })
    );
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

```typescript
export interface State {
  registeredPaymentMethods: RegisteredPaymentMethods;
}

export const initialState: State = {
  registeredPaymentMethods: { list: [], preferred: null }
};
```
---

## Create function

```typescript
// create a reducer function
export const shoppingCartReducer = createReducer(
  initialState,
  on(addShoppingCartItem, onAddShoppingCartItem)
);
// respond to an action
function onAddShoppingCartItem(state: ShoppingCart, { newShoppingCartItem }) {
  return { ...state, items: [...state.items, newShoppingCartItem] };
}
```

---
## Register in Store

### Adding to Root Store

```typescript
export const rootReducers: ActionReducerMap<RootState> = {
  router: routerReducer,
  shoppingCart: shoppingCartReducer
};
```

> Alternative : Create a new Feature Store

--

```typescript
StoreModule.forFeature('shoppingCart', shoppingCartReducer)
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
## Fachadas

---

## Create selector

```typescript
export const shoppingCartFeature = (state: RootState) => state.shoppingCart;

export const shoppingCartItems = createSelector(
  shoppingCartFeature,
  (state: ShoppingCart) => state.items
);

export const shoppingCartItemsCount = createSelector(
  shoppingCartFeature,
  (state: ShoppingCart) => state.items.length
);
```

---

## Selecting data

```typescript
//shell.component.ts

public shoppingCartItemsCount$: Observable<number>;

constructor(private store: Store<RootState>) {
  this.shoppingCartItemsCount$ = this.store.pipe(select(shoppingCartItemsCount));
}
```

---

## Fachadas


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
## Api async effects
## More Api async effects

---

## Install

```
yarn add @ngrx/effects
```

---

## Efecto básico

```typescript
//shopping-cart.effects.ts
@Injectable()
export class ShoppingCartEffects {
   // Create an Observable of actions,
   // with the pipe functions in line
   public logAddProduct_Inline$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addShoppingCartItem),
        tap(action => console.log('action_Inline:', action))
      ),
    { dispatch: false }
  );

  // Create an Observable of actions,
  // with the pipe functions as class methods
  public logAddProduct$ = createEffect(
    this.logAddProductAction.bind(this),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}

  private logAddProductAction() {
    return this.actions$.pipe(
      ofType(addShoppingCartItem),
      tap(action => console.log('action:', action))
    );
  }
}
```

---

### Register

```typescript
// app.module.ts
EffectsModule.forRoot([ShoppingCartEffects]),
```

---

## Api async effects

```yaml
As a: customer,
  I want: to load my shopping cart from server
  so that: I can see it anywhere
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

## More Api async effects

```yaml
As a: customer,
  I want: to save my shopping cart to server
  so that: I can see it anywhere
```

---


```typescript
// shopping-cart.actions.ts
export const saveShoppingCart = createAction(
  '[Navigation Section] Save Shopping Cart',
  props<{ shoppingCartToSave: ShoppingCart }>()
);

export const shoppingCartSaved = createAction(
  '[ShoppingCart Effects] Shopping Cart Saved',
  props<{ savedShoppingCart: ShoppingCart }>()
);

export const shoppingCartErrorSaving = createAction(
  '[ShoppingCart Effects] Shopping Cart Error Saving',
  props<{ error: string }>()
);
```

---

```typescript
//shopping-cart.effects.ts

public saveShoppingCart$ = createEffect(this.saveShoppingCart.bind(this));

private saveShoppingCart() {
  return this.actions$.pipe(
    ofType(saveShoppingCart),
    switchMap(action =>
      this.cartService.postShoppingCart(action.shoppingCartToSave).pipe(
        map(result => shoppingCartSaved({ savedShoppingCart: result })),
        catchError(error => of(shoppingCartErrorSaving({ error: error.message })))
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
  on(shoppingCartSaved, onShoppingCartSaved),
  on(shoppingCartErrorSaving, onApiError)
);

function onShoppingCartSaved(state: ShoppingCart, { savedShoppingCart }) {
  return savedShoppingCart;
}
function onApiError(state: ShoppingCart, { error }) {
  return { ...state, error: error };
}
```

---

```typescript
// shell.component.ts
public saveShoppingCart() {
  this.getCurrentShoppingCart$().subscribe(current => this.saveCurrentShoppingCart(current));
}

private getCurrentShoppingCart$() {
  return this.store.pipe(
    select(shoppingCartFeature),
    take(1)
  );
}

private saveCurrentShoppingCart(current: ShoppingCart) {
  const action = saveShoppingCart({ shoppingCartToSave: current });
  this.store.dispatch(action);
}
```

---

> Recap:

# 5 Effects

## Install
## Efecto básico
## Api async effects
## More Api async effects

---

> Next:

# Deploy Progressive Web Apps

## Angular Service Worker con el CLI
## Configuración de caché
## Actualizaciones y notificaciones


> **Blog de apoyo:** [Detección del cambio en Angular](https://academia-binaria.com/deteccion-del-cambio-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
