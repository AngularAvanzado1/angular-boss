title: 6-PWA
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Progressive Web Applications

---

    # 1. Angular Service Worker con el CLI
    # 2. Configuración de caché
    # 3. Actualizaciones y notificaciones
    # 4. Shell


---

```yaml
As a: web user,
  I want: to have similar capabilities to native
  so that: I can  have a better user experience

```

---

class: impact

# 1 Angular Service Worker con el CLI

## Instalación
## Modificaciones automáticas
## Paquetes recomendados

---

## 1.1 Instalación de de PWA

```terminal
ng add @angular/pwa --project shop
```

---

## 1.2 Modificaciones automáticas

### angular json
```typescript
architect.build.options.assets: [..."apps/shop/src/manifest.json"]
architect.configuration.production.serviceWorker: true
architect.configuration.production.ngswConfigPath: "apps/shop/ngsw-config.json"
```

--

### index.html
```html
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#1976d2">
  <noscript>Please enable JavaScript to continue using this application.</noscript>
```

--

app.module.ts
```typescript
ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
```

### otros
- ngsw-config.json
- manifest.webmanifest
- /assets/icons
---

## 1.3 Paquetes recomendados

```
yarn add -D ngx-pwa-icons
cd apps/shop
apps/shop/icon.png
ngx-pwa-icons
"build:shop": "ng build shop --prod",
yarn add -D angular-http-server
"start:shop:pwa": "angular-http-server --open -p 8080 --path ./dist/apps/shop",
```

---

> Recap:

# 1 Angular Service Worker con el CLI

## Instalación
## Modificaciones automáticas
## Paquetes recomendados

---

class: impact

# 2 Configuración de caché

## Assets
## API

---

## Assets

### default Full App

```json
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
  ],
```

### proposed Lazy App

```json
  "assetGroups":[
    {
      "name": "coreapp",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/common*.js",
          "/main*.js",
          "/ngsw*.js",
          "/*woker*.js",
          "/*polyfills*.js",
          "/runtime*.js"
        ]
      }
    },
    {
      "name": "lazyapp",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": ["/*.js"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
  ]
```

---

## API

### dataGroups

```json
 "dataGroups": [
  {
    "name": "cache-first-greeting",
    "urls": [
      "http://localhost:3333/api"
    ],
    "cacheConfig": {
      "strategy": "performance",
      "maxAge": "1d",
      "maxSize": 10
    }
  },
  {
    "name": "api-first-rates",
    "urls": [
      "https://api.exchangeratesapi.io/latest?symbols=GBP",
      "https://api.exchangeratesapi.io/latest"
    ],
    "cacheConfig": {
      "strategy": "freshness",
      "timeout": "5s",
      "maxAge": "1h",
      "maxSize": 10,
    }
  }
]
```

---

> Recap:

# 2 Configuración de caché

## Assets
## API

---

> Next:

# Server Side Rendering

## Angular Universal
## Despliegue con Node Express
## Variantes: shell y pre-rendering


> **Blog de apoyo:** [Detección del cambio en Angular](https://academia-binaria.com/deteccion-del-cambio-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
