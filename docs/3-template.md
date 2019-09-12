title: 3-Template
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Componentes dinámicos, directivas y pipes

---

    # 1. Plantillas de contenido dinámico

    # 2. Atributos custom con Directivas

    # 3. Funciones de transformación con Pipes


---

class: impact

# 1 Plantillas de contenido dinámico

## Un componente común
## Implementaciones distintas

---

```yaml
As a: customer,
  I want: to see a product card with price in euros
  so that: i can decide to purchase it or not

As a: seller,
  I want: to see a product card with stock
  so that: I can ask for more or not
```

```bash
ng g @nrwl/angular:library products --prefix=ab-products
```

---

## 1.1 Un componente común

```bash
ng g c product-template --project=products --module=products.module.ts --export
```


> La visión del comprador y del vendedor es parecida. Mantenemos estructura, inyectamos contenido.

```html
<article style="margin: 5px; padding: 5px; border: 2px; border-style: solid;">
  <header>
    <h2>
      {{ product.description }}
    </h2>
  </header>
  <main>
    <ng-content select="main"></ng-content>
  </main>
  <footer style="margin-top: 5px">
    <ng-content select=".actions"></ng-content>
  </footer>
</article>
```

La directiva `ngContent` permite crear *slots* para incrustar contenido a voluntad del consumidor.
Cada *slot* se identifica mediante un `select="css-selector"`.

---

## 1.2 Implementaciones distintas
```bash
ng g m catalog --project=shop --module=app.module.ts --routing --route=catalog
ng g c product --project=shop --module=catalog\catalog.module.ts
```

```html
<ab-products-product-template [product]="product">
  <main>
    <div>
      {{ product.brand }} - {{ product.category }}
    </div>
    <div>
      Price: {{ product.price }}
    </div>
  </main>
  <nav class="actions">
    <button (clic)="buy.next()"
            style="background-color:coral; padding: 5px"><strong>Buy me!</strong></button>
  </nav>
</ab-products-product-template>
```
---

> Recap:

# 1 Plantillas de contenido dinámico

## Un componente común
## Implementaciones distintas

---

class: impact

# 2 Atributos custom con Directivas

## Generación de directivas
## Consumo de directivas


---

```yaml
As a: seller,
  I want: to see a green mark on products with stock
  so that: I know I don't do need to refill

As a: seller,
  I want: to see a red mark on products with out stock
  so that: I know I need to refill

```

---

## 2.1 Generación de directivas

```terminal
ng g directive shared/out-of-stock --project=warehouse --export
```

```typescript
@Directive({
  selector: '[angularBusinessOutOfStock]'
})
export class OutOfStockDirective {
  private minimalStock = 10;
  @Input()
  set angularBusinessOutOfStock(stock: number) {
    const color = stock <= this.minimalStock ? 'Red' : 'Green';
    this.el.nativeElement.style.backgroundColor = color;
  }
  constructor(private el: ElementRef) {}
}
```

---

## 2.2 Consumo de directivas

```typescript
@NgModule({
  declarations: [OutOfStockDirective],
  imports: [CommonModule, ViewsModule],
  exports: [ViewsModule, OutOfStockDirective]
})
export class SharedModule {}
```

```html
<div [angularBusinessOutOfStock]="card.item.stock"
  data-cy="product-stock">
  Remains {{ card.item.stock }} <span>units</span>
</div>
```

---

> Recap:

# 2 Atributos custom con Directivas
## Generación de directivas
## Consumo de directivas
---

class: impact

# 3 Funciones de transformación con Pipes

## Generación de pipes
## Consumo de pipes

---

```yaml
As a: customer,
  I want: to see a product price also in dollars
  so that: I can compare prices
As a: customer,
  I want: to see a product price also in pounds
  so that: I can compare prices
```

---

## 3.1 Generación de pipes


```terminal
ng g pipe shared/exRate --project=shop --export
```

```typescript
@Pipe({
  name: 'exRate'
})
export class ExRatePipe implements PipeTransform {
  private euroDollars = 1.13;
  constructor(private httpClient: HttpClient) {}
  public transform(euros: number, symbol: string): number | Observable<number> {
    if (!symbol) {
      return euros * this.euroDollars;
    } else {
      const ratesApi = 'https://api.exchangeratesapi.io/latest?symbols=' + symbol;
      return this.httpClient.get<any>(ratesApi).pipe(map(resp => euros * resp.rates[symbol]));
    }
  }
}
```

---

## 3.2 Consumo de pipes

```typescript
@NgModule({
  declarations: [ExRatePipe],
  imports: [CommonModule, FormsModule, ViewsModule, HttpClientModule],
  exports: [ViewsModule, ExRatePipe]
})
export class SharedModule {}
```

```html
<div class="mat-caption">
  Also ${{ card.item.price | exRate | number:'1.0-0'}} or
  {{ card.item.price | exRate:'GBP' | async | number:'1.0-0'}} £
</div>
```

---

> Recap:

# 3 Funciones de transformación con Pipes

## Generación de pipes
## Consumo de pipes

---


> Next:

# Redux con observables RxJs

## Arquitectura del patrón Redux
## Implementación de un Store con RxJs


> **Blog de apoyo:** [Detección del cambio en Angular](https://academia-binaria.com/deteccion-del-cambio-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
