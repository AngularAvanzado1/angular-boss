# Nx, mono repositorios en Angular

Empiezo este **tutorial de Angular Avanzado** con la frase con la que acabé un artículo de opinión sobre arquitectura de software acerca de [Angular para grandes aplicaciones.](https://medium.com/@albertobasalo71/angular-para-grandes-aplicaciones-b66786fd3032)

> Angular y las decisiones de diseño que le acompañan tienen como objetivo facilitar el desarrollo y mantenimiento a medio y largo plazo de aplicaciones web no triviales.

Las empresas de desarrollo y los clientes finales que escogen **Angular**, suelen ser de tamaño medio o grande. Cuanto mayor sea el problema más destaca este _framework_. Y tarde o temprano esos grandes proyectos necesitarán compartir o reutilizar código. La herramienta [Nx de Nrwl](https://nx.dev/angular) ayuda en esa tarea facilitando la creación de espacios de trabajo multi proyecto: **los mono repositorios.**

Partiendo de cero y usando las herramientas de [Nrwl.io/](https://nrwl.io/) crearemos un _blueprint_ para desarrollar grandes aplicaciones. Al finalizar tendrás, en el mismo repositorio, un par de aplicaciones y varias librerías reutilizables creadas con los _Nx power-ups_.

> Código asociado a este tutorial en _GitHub_: [angular.builders/angular-blueprint/](https://github.com/angularbuilders/angular-blueprint)


## Tabla de Contenido:

[1. Crear el repositorio.](./#1-Crear-el-repositorio)

[2. Generar varias aplicaciones con Angular.](./#2-Generar-una-SPA-con-Angular)

[3. Tener una biblioteca Angular con componentes propios.](./#3-Tener-una-biblioteca-Angular-con-componentes-propios)

[4. Tener una biblioteca TypeScript con lógica de instrumentación.](./#4-Tener-una-biblioteca-TypeScript-con-logica-de-instrumentacion)

[5. Tener una biblioteca Angular con lógica de instrumentación.](./#5-Tener-una-biblioteca-Angular-con-logica-de-instrumentacion)

[Diagramas](./#Diagramas)

[Resumen](./#Resumen)

---

# 1. Crear el repositorio

> Como arquitecto de software quiero disponer de un espacio de trabajo único para crear aplicaciones y librerías.

Lo primero será preparar las herramientas. **Nx** es un complemento del **CLI** así que debemos tener este último disponible. Voy a emplear [yarn](https://yarnpkg.com/lang/en/) para la instalación de paquetes y la ejecución de comandos. Pero se muestran las instrucciones alternativas con `npm`. El repositorio siempre lo creo vacío y después agrego las capacidades específicas para **Angular**.

```bash
# Add latest Angular CLI
yarn global add @angular/cli
# Sets yarn as default packager for cli
ng config -g cli.packageManager yarn
# Creates empty repository
yarn create nx-workspace angular-blueprint

# also with NPM...
npm i -g @angular/cli
npx create-nx-workspace@latest angular-blueprint

# Adds Angular capabilities
ng add --dev @nrwl/angular
```

---

# 2. Generar una SPA con Angular

> Como desarrollador Angular quiero tener una aplicación SPA y otra sin enrutado configuradas para empezar con una base sólida.

Los próximos comandos te sonarán a los mismo del **angular-cli**. Es normal, pues **Nx** utiliza y mejora las capacidades de la herramienta original. La diferencia está en que la recién creada aplicación, en lugar de nacer en la raíz del _workspace_, va la carpeta específica `/apps`.

```bash
# Generate an Angular application with nx power-ups
ng g application spa --routing=true --style=css --enableIvy=true --prefix=ab-spa --directory=
# Start default !!!
yarn start
# Generate an Angular application with nx power-ups
ng g application web --routing=false --style=css --enableIvy=true --prefix=ab-web --directory=
# Start especific !!!
yarn start:web
```

Ambas aplicaciones comparten la configuración del `angular.json` y las demás herramientas de ayuda como **tslint** y **prettier**. Destaca mucho que también que compartan `/node_modules`, lo cual se agradece en el tiempo y en el espacio.

---

# 3. Tener una biblioteca Angular con componentes propios

> Como desarrollador quiero tener una biblioteca con componentes exportados para que los pueda usar en varias aplicaciones.

Si eres una empresa consultora es posible que te encuentres repitiendo funciones o pantallas una y otra vez para distintos clientes. Por supuesto que una gran empresa seguro que se hacen muchas aplicaciones similares, a las que les vendría de maravilla **compartir una biblioteca de componentes**.

Pues ahora crear librerías es igual de sencillo que crear aplicaciones. **Nx** las depositará en la carpeta `/libs` y se ocupará de apuntarlas en el `tsconfig.json` para que la importación desde el resto del proyecto use alias cortos y evidentes.

Crear componentes en un entorno multi proyecto requiere especificar a qué proyecto se asociarán. Para empezar vamos a crear los componentes básicos para cualquier _layout_ lo más sencillos posible.

```bash
# Generate an Angular library with nx power-ups
ng g library layout --routing=false --style=css --prefix=ab-layout --directory=
# Generate Header Component
ng g c components/header --project=layout --export=true
# Generate Nav Component
ng g c components/nav --project=layout --export=true
# Generate Footer Component
ng g c components/footer --project=layout --export=true
```

Puedes usarlos como cualquier otro componente y en cualquier aplicación del repositorio. Simplemente importando el módulo en el que se declaran: el `LayoutModule`. NX se encarga de referenciar cada proyecto en el fichero `tsconfig.json`. De esa forma se facilita su importación en cualquier otra aplicación del repositorio.

```TypeScript
import { LayoutModule } from '@angular-blueprint/layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

# 4. Tener una biblioteca TypeScript con lógica de instrumentación.

> Como arquitecto quiero tener una biblioteca en TypeScript con lógica de instrumentación de modo que pueda usarla con varios frameworks o incluso en puro JavaScript.

Más temprano que tarde aparecerán funcionalidades comunes a distintas aplicaciones. Validadores genéricos, utilidades o casos concretos de un cliente pero que se usan en todos sus desarrollos. En este ejemplo voy a suponer la necesidad común de un logger. Inicialmente trabajará con la consola en modo desarrollo y no hará nada en producción. Pero lo haremos de forma que en el futuro lo pueda escribir en otros servicios.

Un poco de arquitectura de software. Todo lo que podamos programar y que no dependa de un _framework_ debemos encapsularlo en librerías independientes. De esa forma puede reutilizarse con otras tecnologías o sobrevivir dignamente a la evolución o desaparición de Angular.

Lo primero será crear la librería. Pero esta vez no usaremos los _schematics_ del **cli**, si no los propios de **nrwl**. La idea es usarla como la **capa de dominio de la arquitectura**. En ella pondremos los modelos y servicios de lógica de negocio con las menores dependencias posibles. Repito lo fundamental: minimizar las dependencias. En concreto no dependeremos de Angular, lo cual permitiría usarlo con otros _frameworks_ actuales o futuros.

```bash
# Generate a Type Script library with nx power-ups
ng g @nrwl/workspace:library tracer-domain --directory=
```
Por ahora no te preocupes de la implementación. La muestro para destacar las dos cosas que considero más importantes:

- No hay ninguna referencia explícita a _Angular_.

- Lo que quieras exportar debe indicarse en el fichero `index.ts`.

Por lo demás es puro _TypeScript_; en dos carpetas con intenciones bien claras: `models/` y `services/` creo de forma manual los siguientes ficheros:

`models/trace.interface.js`

```typescript
import { traceLevels } from './trace-levels.type';
import { traceOrigins } from './trace-origins.type';

export interface Trace {
  origin: traceOrigins;
  level: traceLevels;
  message: string;
  error?: any;
  parameter?: {
    label: string;
    value: number;
  };
}
```

`services/console-tracer.driver.js`

```typescript
import { Trace } from '../models/trace.interface';
import { Tracer } from '../models/tracer.interface';

export class ConsoleTracerDriver implements Tracer {
  public writeTrace(trace: Trace) {
    switch (trace.level) {
      case 'system':
        return this.writeSystem(trace);
      case 'error':
        return this.writeError(trace);
      default:
        return '';
    }
  }
  public writeSystem(trace: Trace) {
    const origin = this.getOriginPart(trace);
    const consoleMessage = `${origin}${trace.message}`;
    console.log(consoleMessage);
    return consoleMessage;
  }
  public writeError(trace: Trace) {
    const origin = this.getOriginPart(trace);
    const consoleMessage = `${origin}Error`;
    console.group(consoleMessage);
    console.log(trace.message);
    if (trace.error) {
      console.warn(trace.error.message);
      console.log(trace.error.stack || 'no stack');
    }
    console.groupEnd();
    return consoleMessage;
  }

  private getOriginPart = (trace: Trace): string =>
    `[${trace.origin.toLocaleUpperCase()}]: `;
}
```

Y ahora lo exportamos. Como no hay módulos ni artificios de Angular, todo acaba siendo ficheros puros y duros.

`index.ts`

```typescript
export * from './lib/models/trace.interface';
export * from './lib/models/tracer.interface';
export * from './lib/services/console-tracer.driver';
```

---


# 5. Tener una biblioteca Angular con lógica de instrumentación.

> Como desarrollador quiero tener una biblioteca Angular con servicios de instrumentación para que cualquiera pueda inyectarlos en varias aplicaciones Angular.

La anterior librería es directamente utilizable por cualquier aplicación web, por supuesto incluido **Angular**. Pero, una vez que tengamos la lógica encapsulada en algo reutilizable entre _frameworks_, podemos preparar un módulo específico con servicios para facilitar la inyección de dependencias tradicional de **Angular**.

```bash
# Generate an Angular library with nx power-ups
ng g library tracer --routing=false --style=css --prefix=ab-tracer --directory=
# Generate a Tracer Service
ng g s services/tracer --project=tracer
# Generate an Error Handler Service
ng g s services/error-handler --project=tracer
```

Ya que estamos en ambiente **Angular** podemos hacer uso de los productos su ecosistema, como por ejemplo _@Inject()_. De esta forma no comprometemos los servicios de la librería con su configuración; la cual vendrá desde la aplicación. Incluso queda preparado para que las clases de dominio o los _drivers_ y repositorios puedan ser inyectados.

La configuración del servicio la haremos mediante un _TOKEN_ inyectable. En esta caso empezaremos con un objeto con un mísero _Boolean_ para indicarnos si estamos o no en producción pues usaremos la consola para _tracear_ sólo en desarrollo y por ahora no haremos nada en producción.

`servicers/tracer-service.ts`

```typescript
import { ConsoleTracerDriver, Trace, Tracer } from '@angular-blueprint/tracer-domain';
import { Inject, Injectable, InjectionToken } from '@angular/core';

export interface TracerConfig {
  production: boolean;
}

export const TRACER_CONFIG = new InjectionToken<TracerConfig>('tracer-config');

class NoTrace implements Tracer {
  writeTrace = (trace: Trace) => '';
}

@Injectable({
  providedIn: 'root'
})
export class TracerService implements Tracer {
  private tracer: Tracer;

  constructor(@Inject(TRACER_CONFIG) tracerConfig?: TracerConfig) {
    if (tracerConfig.production) this.tracer = new NoTrace();
    else this.tracer = new ConsoleTracerDriver();
  }

  public writeTrace(trace: Trace): string {
    return this.tracer.writeTrace(trace);
  }
}
```

Y ahora ya se pueden importar y declarar en cualquier aplicación. Como si fuesen servicios del sistema. La magia de la inversión del control se produce con `useValue` mediante el cual inyectamos un valor de configuración concreto al _TOKEN_.

`spa/app.module.ts`

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }),
    LayoutModule,
    TracerModule
  ],
  providers: [
    {
      provide: TRACER_CONFIG,
      useValue: { production: environment.production }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(tracerService: TracerService) {
    const startMessage: Trace = {
      origin: 'system',
      level: 'system',
      message: 'App Module Started for SPA'
    };
    tracerService.writeTrace(startMessage);
  }
}
```
Y ya tenemos un germen de arquitectura flexible (controlada por la inyección de dependencias) y reutilizable (entre aplicaciones Angular) con un dominio estable e independiente de _frameworks_.

## Diagramas

El siguiente diagrama nos muestra a vista de pájaro las distintas librerías y aplicaciones que tenemos en este momento. Fíjate en la jerarquía de dependencias : Aplicaciones -> Librerías Angular -> Librerías del Dominio.

![Dependencias entre proyectos](/images/10-projects-dependency.png)

---

Tienes más ejemplos en el repositorio como [la implementación un _ErrorHandler_](https://github.com/angularbuilders/angular-blueprint/blob/master/libs/tracer/src/lib/services/error-handler.service.ts). Es un servicio que una vez proveído hace uso del servicio de trazas.

Dispones de un _journal_ con indicaciones paso a paso de este tutorial. Consulta directamente la [documentación](https://angularbuilders.github.io/angular-blueprint/0-mono_repo) del proyecto en GitHub.

Las tareas relativas a este tutorial están resueltas en el [proyecto 0 - monorepo](https://github.com/angularbuilders/angular-blueprint/projects/1)

![Angular.Builders](/css/images/angular.builders.png)

La iniciativa [Angular.Builders](https://angular.builders) nace para ayudar a desarrolladores y arquitectos de software como tú. Ofrecemos formación y productos de ayuda y ejemplo como [angular.blueprint](https://angularbuilders.github.io/angular-blueprint/).

Para más información sobre servicios de consultoría [ponte en contacto conmigo](https://www.linkedin.com/in/albertobasalo/).

---

## Resumen

En definitiva, los grandes desarrollos demandados por bancos, multinacionales o administración pública requieren soluciones avanzadas. **Angular** es una plataforma ideal para esos grandes proyectos, pero requiere conocimiento y bases sólidas para sacarle partido.

Con este tutorial empiezas tu formación [avanzada en Angular](../tag/Avanzado/) para poder afrontar retos de tamaño industrial. Continúa aprendiendo a crear y ejecutar pruebas automatizadas creando [tests unitarios con Jest y e2e con Cypress en Angular](../tests-unitarios-con-jest-y-e2e-con-cypress-en-Angular).


> Aprender, programar, disfrutar, repetir.
> -- <cite>Saludos, Alberto Basalo</cite>
