# Airship

An Angular implementation of [CARTO's Airship framework](https://carto.com/airship).

All this code is based on the original [CARTO library of Airship](https://github.com/CartoDB/airship), it's available at [npm](https://www.npmjs.com/package/@carto/airship).

If you're interesting in an Angular implementation this library will help you, but if you need a non Angular solution, you'll better prefer CARTO's [implementation](https://github.com/CartoDB/airship).


## Installation

Airship is available as an [npm package](https://www.npmjs.com/package/@geographica/airship).
Choose the version corresponding to your Angular version:
| Angular | Airship |
|---------|---------|
| 5       | 1.x     |
| 6+      | 2.x     |
```
# Using NPM
npm install --save @geographica/airship
```

## Usage

```
import { AirshipModule } from '@geographica/airship';
// In your style.css
@import url(~@geographica/airship/style.css);
```

## Develop

Develop your components inside "src" folder in airship.module.ts

### Demo page

Available at [http://airship.geographica.io](http://airship.geographica.io)

app.module.ts is a module for demo page. If you want to test your components you can add them in app.component.html.
Run `ng serve` and navigate to `http://localhost:4200/`

### Doc page

Avaible at  [http://airship.geographica.io/doc/index.html](http://airship.geographica.io/doc/index.html)

The documentation is generated with [Compodoc](https://compodoc.github.io/website/guides/getting-started.html). if you want to test the generated documentation run `npm run doc:buildandserve` and navigate to `http://localhost:8080/`

## Contributing

For contributing you must create your components in airship.module.ts. Components must be documented using Compodoc sytems. All possible components states should appear on the demo page.
