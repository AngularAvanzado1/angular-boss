title: 2-Change
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Detección del cambio en Angular

---

    # 1. Estrategias de detección del cambio

    # 2. Técnicas OnPush

    # 3. Optimización


---


```yaml
As a: customer,
  I want: to see a shopping cart page
  so that: i can browse the list of products in my basket

As a: customer,
  I want: to pick a product
  so that: I can add units to my basket

As a: customer,
  I want: to remove a product from my basket
  so that: I can take less units

As a: customer,
  I want: to see always counters of my basket
  so that: I can know what I'm buying
```

---

```terminal
ng g m cart --project=shop --module=app.module.ts --routing --route=cart
```

`apps\shop\src\app\app.component.html`

```html
<nav>
  <a [routerLink]="['/cart']">Basket: {{ 0 }} items</a>
</nav>
```

```terminal
ng g c cart/item-picker --project=shop
ng g c cart/basket-list --project=shop
ng g s basket --project=shop
```

---

class: impact

# 1 Estrategias de detección del cambio

## Default

## OnPush

---


## 1.1 Default

```typescript
import { ChangeDetectionStrategy } from '@angular/core';
changeDetection: ChangeDetectionStrategy.Default
```

Con las estrategias por defecto

> Las cosas funcionan como se espera.

---

Se actualiza la vista con:

1 - Datos asíncronos recibidos desde el API

2 - Procesos en Background

3 - Interacción del usuario

Los cambios se detectan siempre por comparación de valores.

---

> Aunque demasiadas veces

--

> Y con demasiado coste cada vez

---

## 1.2 OnPush


```typescript
import { ChangeDetectionStrategy } from '@angular/core';
changeDetection: ChangeDetectionStrategy.OnPush
```

Al usar la detección OnPush en el contenedor:

> Las llamadas se reducen pero...
--
> Las datos muestran incoherencias o no se muestran

---

<!-- Se actualiza la vista con:

1 - Los recepción de datos no se muestra en pantalla

2.1 - El proceso en Background de creación en el picker no ocurre al iniciar porque no llega a crearse. Hay que forzarlo con un click.

2.2 - El proceso en Background de borrado en el container (si llega a tiempo)  ya no desencadena la orden de pintado

3 - La interacción del usuario sí que obliga al repintado, pero no actualiza la hora de actualización tras guardar en servidor -->

---

> Recap:

# 1 Estrategias de detección del cambio

## Default

## OnPush

---

class: impact

# 2 Técnicas OnPush

## DetectChanges

## Async

## Inmutable

---

## 2.1 DetectChanges

Forzar la detección de cambios

```typescript
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

public changeConfig = {
  simulateBackground: true,
  useCDR: true,
  useAsync: false,
  cloningList: false
};

constructor(private cdr: ChangeDetectorRef) {}

if (this.changeConfig.useCDR) {
  this.cdr.detectChanges();
}

```

> Las datos se muestran correctamente y a su debido tiempo

Se actualiza la vista con:

1 - La recepción de datos muestra todo ok, a base de hacerlo en cada callback
2.1 - El proceso en Background del picker fuerza el repintado por tratarse de un evento Output
2.1 - El proceso en Background del container fuerza el repintado mediante el cdr
3 - La interacción de guardar funciona bien, por ser un evento DOM, y ahora además refrescando tras el guardado.

---

## 2.2 Async

```html
<span *ngIf="changeConfig.useAsync===true">
  <span *ngIf="(shoppingCart$ | async) && (products$ | async )">
```

```typescript
public changeConfig = {
  simulateBackground: true,
  useCDR: false,
  useAsync: true,
  cloningList: false
};
tap()

```

> Las datos siguen mostrando incoherencias o no se muestran

Se actualiza la vista con:

1 - Los recepción de datos muestra todo ok pues el async llama por su cuenta al cdr
2.1 - El proceso en Background del picker fuerza el repintado por tratarse de un evento Output, pero sólo de las unidades
2.2 - El proceso padre se lanza pero, de nuevo no repinta nada, pues no se detecta evento
3.1 - Si el usuario añade o quita del carrito se actualiza correctamente
3.2 - La interacción de guardado continúa funcionando bien y, gracias al async, refrescando tras el guardado. Por tratarse de un observable, el cambio tras el guardado recrea el picker.. y este agrega un nuevo item en background


---

## 2.3 Inmutable

> Qué pasa si ponemos OnPush en ItemsList?

1 - Los recepción de datos funciona porque la lista de items nace con un valor definido
2.1 - El proceso en Background del picker no repinta porque a nivel del componente nada ha cambiado
2.2 - Lo mismo si se lanza desde el padre, para el hijo todo sigue igual
3.1 - Si el usuario añade o quita del carrito se produce un evento DOM y se repinta
3.2 - Si el usuario guarda se produce un evento DOM y se repinta

El problema es que el componente hijo con la estrategia OnPush ya no detecta cambios internos en un array. Sólo se refresca ante cambios en las referencias. Para forzarlos debemos clonar los objetos.

```typescript
public changeConfig = {
  simulateBackground: true,
  useAsync: true,
  useCDR: true,
  cloningList: true
};
```



```typescript
public addToCart(item: ShoppingCartItem) {
  if (this.changeConfig.cloningList) {
    this.shoppingCart.items = [...this.shoppingCart.items, { ...item }];
  } else {
    this.shoppingCart.items.push({ ...item });
  }
  console.log(`Added item ${JSON.stringify(item)}`);
  this.calculateTotalUnits(this.shoppingCart);
}
public removeFromCart(item: ShoppingCartItem) {
  if (this.changeConfig.cloningList) {
    this.shoppingCart.items = this.shoppingCart.items.filter(i => i.product._id !== item.product._id);
  } else {
    this.shoppingCart.items.forEach((i, index) => {
      if (i.product._id === item.product._id) this.shoppingCart.items.splice(index, 1);
    });
  }
  console.log(`Removed item  ${JSON.stringify(item)}`);
  this.calculateTotalUnits(this.shoppingCart);
}
```
> Ahora ya está todo rápido y bien

Se actualiza la vista con:

1 - Los recepción de datos muestra todo ok pues el async llama por su cuenta al cdr
2 - Los proceso en background generan eventos o lanzan la detección por su cuenta. Para que el componente hijo sea notificado se le envía un clon del array en cada ocasión.
3 - La interacción genera evento, refresca con async y clona


---

> Recap:

# 2 Técnicas OnPush

## DetectChanges

## Async

## Inmutable

---

class: impact

# 3 Optimización

## OnPush es más ligero

## Async, CDR y clone detectan los cambios

---

## 3.1 OnPush es más ligero

- Se lanza menos veces
- Sólo comprueba referencias, no valores

---

## 3.2 Async, CDR y clone detectan los cambios

- Async para que las respuestas desde observables sean limpias
- CDR cuando el cambio venga de procesos asíncronos pero no observables
- Clonado para que los componentes presentadores detecten cambios en las referencias

---

> Recap:

# 3 Optimización

## OnPush es más ligero

## Async, CDR y clone detectan los cambios

---


> Next:

# Componentes dinámicos, directivas y pipes

## Plantillas de contenido dinámico
## Atributos custom con Directivas
## Funciones de transformación con Pipes


> **Blog de apoyo:** [Detección del cambio en Angular](https://academia-binaria.com/deteccion-del-cambio-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
