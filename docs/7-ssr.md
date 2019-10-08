title: 7-SSR
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Server Side Rendering

---

    # 1. Angular Universal
    # 2. Despliegue con Node Express
    # 3. Variantes: shell y pre-rendering


---

class: impact

# 1 Angular Universal

## Vuelta al servidor
## Para mejorar el SEO
## Para mejorar la experiencia en la primera visita

---

## 1.1 Vuelta al servidor

> Angular nació para vivir en el navegador.

--

- Para **quitarle carga al servidor** generando el contenido dinámico en el navegador en base a plantillas.

- Para enviar por la red primero la aplicación y después los datos, **ahorrando transferencia** durante un uso continuado.

- Para mejorar la **experiencia del usuario** al no percibir recarga de página durante la navegación dentro de la aplicación.

--

### Ideal en entornos de intranet o aplicaciones de gestión de uso intensivo.

--

### Problemático para uso esporádico o indexable públicamente.

---

## 1.2 Para mejorar el SEO

> El contenido se genera durante la ejecución del JavaScript en el navegador.

--

- Los **robots** no tienen nada significativo que indexar.

- Las **redes sociales** no encuentran cabeceras para mejorar la presentación de enlaces.

--

### Hay que enviar el contenido ya generado.

--

### Pero sin perder la experiencia de usuario durante la ejecución.

---

## 1.3 Para mejorar la experiencia en la primera visita

> Para mostrar contenido antes hay que descargar y ejecutar la aplicación.

--

- Los **usuarios** ven una página vacía demasiado tiempo.

- El **peso de la descarga inicial** es desproporcionado a pesar de _lazy loading_.

--

### Hay que enviar el contenido ya generado.

--

### Descargar la aplicación en segundo plano.


---

> Recap:

# 1 Angular Universal

## Vuelta al servidor
## Para mejorar el SEO
## Para mejorar la experiencia en la primera visita

---

class: impact

# 2 Despliegue con Node Express

## Add Express Engine
## Scripts de compilado y despliegue
## Control de rutas

---

## 2.1 Add Express Engine

```bash
ng add @nguniversal/express-engine --clientProject shop
```

---

## 2.2 Scripts de compilado y despliegue

```json
{
  "compile:server": "webpack --config webpack.server.config.js --progress --colors",
  "start:ssr": "npm run build:ssr && npm run serve:ssr",
  "serve:ssr": "node dist/server",
  "build:ssr": "npm run build:client-and-server-bundles && npm run compile:server",
  "build:client-and-server-bundles": "ng build --prod && ng run shop:server:production --bundleDependencies all"
}
```

> --bundleDependencies all ????

---

## 2.3 Control de rutas

---

> Recap:

# 2 Despliegue con Node Express

## Add Express Engine
## Scripts de compilado y despliegue
## Control de rutas

---

class: impact

# 3 Variantes: shell y pre-rendering

## Cuando el SEO no es problema
## Shell para mejora de experiencia inicial
## Pre renderizado de toda la aplicación

---

## 3.1 Cuando el SEO no es problema

---

## 3.2 Shell para mejora de experiencia inicial

---

## 3.3 Pre renderizado de toda la aplicación

---

> Recap:

# 3 Variantes: shell y pre-rendering

## Cuando el SEO no es problema
## Shell para mejora de experiencia inicial
## Pre renderizado de toda la aplicación


---

> Next:

# Internacionalización y puesta en producción

## Traducciones
## Adaptaciones culturales de tiempo y moneda
## Otras consideraciones para aplicaciones en producción.


> **Blog de apoyo:** [Velocidad y SEO con el SSR de Angular Universal](https://academia-binaria.com/velocidad-y-seo-con-el-ssr-de-angular-universal/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)

