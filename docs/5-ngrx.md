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

---

> Redux no hace rápido lo simple, sino mantenible lo complejo

--

> NgRx no hace rápido a Redux, sino mantenible el boilerplate

### Estándar de facto,

### Herramientas de generación de código

### Modular y extensible.


---

class: impact

# 1 Instalación y configuración

## Instalación de NgRx
## Registro y configuración
## Router y DevTools

---

## 1.1 Instalación de NgRx

```terminal
ng add @ngrx/store@next --project shop --statePath store --stateInterface RootState
```

---

## 1.2 Registro y configuración

```typescript
StoreModule.forRoot(rootReducers, { metaReducers })
export const rootReducers: ActionReducerMap<RootState> = {};
export interface RootState{}
```

---

## 1.3 Router y DevTools

```
ng add @ngrx/router-store@next --project shop
ng add @ngrx/store-devtools@next --project shop
```

```typescript
export interface RootState {
  router: RouterReducerState<any>;
}
```

---

> Recap:

# 1 Instalación y configuración

## Instalación de NgRx
## Registro y configuración
## Router y DevTools

---

class: impact

# 2 Actions

## Create
## Dispatch

---

```yaml
As a: customer,
  I want: to add items to my shopping cart
  so that: I can buy them

As a: customer,
  I want: to see the total units always updated
  so that: I know how many items I will buy

```

---

## Create

```typescript
import { ShoppingCartItem } from '@angular-business/models';
import { createAction, props } from '@ngrx/store';

export const addShoppingCartItem = createAction(
  '[Product Catalog] Add to Shopping Cart',
  props<{ newShoppingCartItem: ShoppingCartItem }>()
);
```

---

## Dispatch

```typescript
constructor(private store: Store<RootState>) {}

public buyProduct(product: Product) {
  const payload = { product: product, quantity: 1 };
  const action = addShoppingCartItem({ newShoppingCartItem: payload });
  this.store.dispatch(action);
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
// root.state.ts
export interface RootState {
  router: RouterReducerState<any>;
  shoppingCart: ShoppingCart;
}
// shoppingCart.state.ts
export const initialState: ShoppingCart = { _id: '', items: [], client: '', status: '' };
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
