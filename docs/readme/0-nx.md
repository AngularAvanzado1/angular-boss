title: 0-Nx
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Repositorios profesionales con Nx

---

    1. Nx y el CLI
      1.1 Instalación de Nx y CLI
      1.2 Crear y configurar un workspace

    2. Estructura de un workspace
      2.1 Apps
      2.2 Libs

    3 Aplicaciones
      3.1 Frontend webs
      3.2 Backend Apis

    4. Librerías
      4.1 Librerías en TypeScript
      4.2 Librerías de Angular


---

class: impact

# 1 Nx y el CLI

## Instalación de Nx y CLI

## Crear y configurar un workspace

---

## 1.1 Instalación de Nx y CLI

> Angular es una plataforma de desarrollo dogmática y llave en mano.

> Nrwl eXtensions es un conjunto de mejoras para el desarrollo empresarial moderno.

```terminal
yarn add global @angular/cli
yarn add global @nrwl/schematics
```

[Nx.dev](https://nx.dev/angular)

---

## 1.2 Crear y configurar un workspace

```bash
yarn create nx-workspace angular-boss

empty # para no crear aplicaciones previas

angular CLI # pero listo para trabajar con angular

```
---

### Recomendaciones

Extensiones de Visual Studio Code

```
{
  "recommendations": [
    "nrwl.angular-console",
    "angular.ng-template",
    "ms-vscode.vscode-typescript-tslint-plugin",
    "esbenp.prettier-vscode",
    "pkief.material-icon-theme",
    "christian-kohler.path-intellisense",
    "ban.spellright",
    "johnpapa.angular-essentials"
  ]
}
```
---

> Recap:

# 1 Nx y el CLI

## Instalación de Nx y CLI

## Crear y configurar un workspace

---

class: impact

# 2 Estructura de un workspace

## Apps

## Libs

---

### Cosas comunes

- angular.json
- package.json
- ts...

### Cosas distintas

- nx.json
  - /tools
  - /apps
  - /libs

---

## 2.1 Apps

```yaml
As a: customer,
  I want: to see a shop
  so that: I can buy products

As a: seller,
  I want: to see a warehouse
  so that: I can take control
```

### Aplicaciones

- shop
- warehouse


---

## 2.2 Libs

```yaml
As a: customer,
  I want: to be greeted
  so that: I feel at home

As a: seller,
  I want: to be greeted
  so that: I feel at home
```

### Librerías

- models

- views

---

> Recap:

# 2 Estructura de un workspace

## Apps

## Libs

---

class: impact

# 3 Aplicaciones

## Frontend webs

## Backend Apis

---

## 3.1 Frontend webs

```
ng generate @nrwl/schematics:application shop --inlineStyle --routing
./apps/shop
./apps/shop-e2e
yarn start
```

```
ng generate @nrwl/schematics:application warehouse --inlineStyle --routing
./apps/warehouse
./apps/warehouse-e2e
ng serve warehouse --port=4201 -o
```

```json
  "start:shop": "ng serve shop --port=4200 -o",
  "start:warehouse": "ng serve warehouse --port=4201 -o",
```

```
yarn start:store
yarn start:warehouse
```


---

## 3.2 Backend Apis

```
ng generate @nrwl/schematics:node-application api --frontendProject=shop
ng serve api
"start:api": "ng serve api",
"warehouse.serve.proxyConfig": "apps/warehouse//proxy.conf.json"
```

```typescript
  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any>('/api/').subscribe(data => (this.title += ' and ' + data.message));
  }
```

---

> Recap:

# 3 Aplicaciones

## Frontend webs

## Backend Apis

---

class: impact

# 4 Librerías

## 4.1 Librerías en TypeScript

## 4.2 Librerías de Angular

---

## 4.1 Librerías en TypeScript

```terminal
ng generate @nrwl/schematics:library models
libs\shared\src\lib\greetings.interface.ts
```

```typescript
export interface Greetings {
  message: string;
}
this.httpClient.get<Greetings>('/api/').subscribe((data: Greetings) => (this.title += ' and ' + data.message));
```

---

## 4.2 Librerías de Angular

```
ng generate @nrwl/schematics:library views --inlineStyle
./lis/views
ng generate @schematics/angular:component product --project=views --export --inlineStyle
```

```typescript
import { ViewsModule } from '@angular-business/views';
@NgModule({
  imports: [ ViewsModule],
})
export class AppModule {}
```

```html
<angular-business-product></angular-business-product>
```
---

---
> Recap:

# 4 Librerías

## Librerías en TypeScript

## Librerías de Angular


---

> Next:

# Testing unitario y de integración

## Jest para tests unitarios

## Cypress para test de integración


> **Blog de apoyo:** [Repositorios profesionales con Nx](https://academia-binaria.com/Repositorios-profesionales-con-Nx/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)

yarn add cypress --dev