title: 9-Elements
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Elements for Web Components

---

    # 1. Componentes independientes del framework
    # 2. Desarrollo y despliegue con Angular
    # 3. Consumo en HTML

---

class: impact

# 1. Componentes independientes del framework

## Origen y potencial
## Estándares y tecnología

---

## 1.1 Origen y potencial

> Hay lácteos que aguantan más que algunos frameworks.

Los **Web Components** son independientes de los _frameworks._

### Usos posibles

- Librerías de diseño multiplataforma

- Migración paulatina de aplicaciones legacy

- Integración dinámica en grandes soluciones CMS

- Mejoras funcionales en aplicaciones server side

---

## 1.2 Estándares y tecnología

Bajo el término Web Components se esconden diversas tecnologías

- Shadow DOM
- HTML templates
- ~~HTML imports~~
- **Custom elements.**

---

El estándar:

> Los **Custom Web Elements** son etiquetas HTML encapsuladas reutilizables para usar en páginas y aplicaciones web. Sólo requieren HTML y JavaScript.

--

La tecnología:

> Angular Elements empaqueta tus componentes como **Custom Web Elements**.


---



> Recap:

# 1. Componentes independientes del framework

## Origen y potencial
## Estándares y tecnología

---

class: impact

# 2. Desarrollo y despliegue con Angular

## Exponer los componentes
## Compilación y despliegue

---

### Un componente común de Angular

`libs\currency\src\lib\converter\converter.component.html`

```html
<form>
  <label>Amount to convert: </label>
  <input name="amount"
         [(ngModel)]="amount"
         type="number"
         (change)="convert()" />
  <label>Converted amount: </label>
  <input name="convertedAmount"
         [(ngModel)]="convertedAmount"
         type="number"
         readonly />
</form>
```

---

`libs\currency\src\lib\converter\converter.component.ts`

```Typescript
@Component({
  selector: 'angular-boss-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  @Input() factor = 1.1;
  @Input() amount = 0;
  @Output() converted = new EventEmitter<number>();
  convertedAmount = 0;
  constructor() {}
  ngOnInit() {
    this.convert();
  }
  convert() {
    this.convertedAmount = this.amount * this.factor;
    this.converted.next(this.convertedAmount);
  }
}
```

---

### El componente sigue siendo Angular

`apps\warehouse\src\app\app.module.ts`

```typescript
import { CurrencyModule } from '@angular-boss/currency';

@NgModule({
  imports: [
    CurrencyModule
  ],
})
export class AppModule {}
```

---

`apps\warehouse\src\app\app.component.html`

```html
<angular-boss-converter amount="100"
                        factor="1.5"></angular-boss-converter>
```

---

## Exponer los componentes

Necesitamos un proyecto para exportar el componente.

`add @angular/elements`

`generate @nrwl/angular:application external-currency`

`apps\external-currency\src\app\app.module.ts`

```typescript
import { ConverterComponent, CurrencyModule } from '@angular-boss/currency';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CurrencyModule],
  providers: [],
  bootstrap: [],
  entryComponents: [ConverterComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const el = createCustomElement(ConverterComponent, { injector });
    customElements.define('angular-boss-currency-converter', el);
  }
}
```


---

## Compilación y despliegue

Toca aplicar la magia de `@angular/elements` y utilidades como `ngx-build-plus` podemos compilarlo como un Web Component.

`ng add ngx-build-plus --project external-currency`

`ng g ngx-build-plus:wc-polyfill --project external-currency`

`ng build --prod --project external-currency`


``


> Recap:

# 2. Desarrollo y despliegue con Angular

## Exponer los componentes
## Compilación y despliegue

---

class: impact

# 3. Consumo en HTML

## Copiar
## Importar

---

> Recap:

# 3. Consumo en HTML

## Copiar
## Importar


---

> Next:

# Angular.Builders

## Angular Blueprint
## Academia Binaria


> **Blog de apoyo:** [Detección del cambio en Angular](https://academia-binaria.com/deteccion-del-cambio-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)

