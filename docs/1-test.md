title: 1-Test
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Test de integración y unitarios

---

    # 1. Tipos de tests

    # 2. Test de Integración con Cypress

    # 3. Test Unitarios con Jest

---

```yaml
As a: developer,
  I want: to test end to end my app
  so that: I can be sure of the functions

As a: developer,
  I want: to unit test my app
  so that: I can be sure of the structure
```

---
class: impact

# 1 Tipos de tests

## Integración o e2e

## Unitarios

---

## 1.1 Integración o e2e

[Cypress](https://www.cypress.io/)



---

## 1.2 Unitarios

[Jest](https://jestjs.io/)

---

> Recap:

# 1 Nx y el CLI

## Integración o e2e

## Unitarios

---

class: impact

# 2 Test de Integración con Cypress

## Cypress

## Test e2e


---


```yaml

As a: customer,
  I want: to see a greetings message
  so that: I feel confident with the page
```

---

## 2.1 Cypress


```json
  "e2e:shop": "ng e2e shop-e2e --watch",
  "e2e:warehouse": "ng e2e warehouse-e2e --watch",
```

```terminal
yarn e2e:shop
yarn e2e:warehouse
```

---

## 2.2 Test e2e

```yaml
GIVEN: the shop web app
  WHEN: user visits home page
    THEN: should display welcome message
    THEN: should display welcome message from the API
```

```typescript
export const getGreeting = () => cy.get('h1');
```

`apps\shop-e2e\src\integration\app.spec.ts`

```typescript
import { getGreeting } from '../support/app.po';

describe('GIVEN: the shop web app', () => {
  beforeEach(() => cy.visit('/'));
  context('WHEN: user visits home page', () => {
    it('THEN: should display welcome message', () => {
      getGreeting().contains('Hello world');
    });

    it('THEN: should display welcome message from the API', () => {
      getGreeting().contains('and Welcome to api!');
    });
  });
});
```

---

> Recap:

# 2 Test de Integración con Cypress

## Cypress

## Test e2e

---

class: impact

# 3 Test Unitarios con Jest

## Jest

## Tests unitarios

---

## 3.1 Jest

```json
  "test:shop": "ng test shop --watch",
  "test:warehouse": "ng test warehouse --watch",
  "test:api": "ng test api --watch",
```

```terminal
yarn test:shop
yarn test:warehouse
yarn test:api
```

---

## 3.2 Tests unitarios

```yaml
GIVEN: an AppComponent declared in AppModule
  WHEN: the AppModule is compiled
    THEN: should create the component
    THEN: should have a property title with value 'shop'
    THEN: should render 'Hello world' in a H1 tag
```


shop: `apps\shop\src\app\app.component.spec.ts`

```typescript
import { UiModule } from '@a-boss/ui';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('GIVEN: an AppComponent declared in AppModule', () => {
  describe('WHEN: the AppModule is compiled', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, UiModule],
        declarations: [AppComponent]
      }).compileComponents();
    }));

    it('THEN: should create the component', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`THEN: should have a property title with value 'shop'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('shop');
    });

    it(`THEN: should render 'Hello world' in a H1 tag`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Hello world');
    });
  });
});
```

---

> Recap:

# 3 Aplicaciones

## Jest

## Tests unitarios

---


> Next:

# Detección del cambio en Angular

## Estrategias de detección del cambio
## Técnicas OnPush
## Optimización


> **Blog de apoyo:** [Test de integración y unitarios](https://academia-binaria.com/test-de-integracion-y-unitarios/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)

