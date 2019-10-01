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
- manifest.json
- /assets/icons
---

## 1.3 Paquetes recomendados

```
yarn add -D ngx-pwa-icons
cd apps/shop
apps/shop/icon.png
ngx-pwa-icons
yarn add -D angular-http-server
"angular-http-server": "angular-http-server"
angular-http-server --open -p 9000 --path ./dist/apps/warehouse
```

//https://medium.com/poka-techblog/turn-your-angular-app-into-a-pwa-in-4-easy-steps-543510a9b626


---

> Recap:

# 1 Angular Service Worker con el CLI

## Instalación
## Modificaciones automáticas
## Paquetes recomendados


---

> Next:

# Server Side Rendering

## Angular Universal
## Despliegue con Node Express
## Variantes: shell y pre-rendering


> **Blog de apoyo:** [Detección del cambio en Angular](https://academia-binaria.com/deteccion-del-cambio-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
