# Airship

Airship is a Angular components library built by Geographica

## Installation

Airship is available as an [npm package](https://www.npmjs.com/package/@geographica/airship).
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

app.module.ts is a module for demo page. If you want to test your components you can add them in app.component.html.
Run `ng serve` and navigate to `http://localhost:4200/`

### Doc page

The documentation is generated with [Compodoc](https://compodoc.github.io/website/guides/getting-started.html). if you want to test the generated documentation run `npm run doc:buildandserve` and navigate to `http://localhost:8080/`

## Contributing

For contributing you must create your components in airship.module.ts. Components must be documented using Compodoc sytems. All possible components states should appear on the demo page.
