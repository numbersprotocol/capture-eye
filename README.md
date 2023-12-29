# Capture Eye

[Capture Eye](https://captureapp.xyz/products/eye) widget seamlessly integrates into your website, facilitating secure and transparent provenance display and purchases of digital content directly from the creator.

- Easily integrate with your digital products
  - Capture Eye effortlessly blends with your existing platforms, elevating your content's value and trustworthiness.
- Decentralized storage of the actual media asset
  - Secure, immutable and long-lasting preservation of your original digital assets, enhancing their credibility and authenticity.

<p align="center"><img src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeiahjvz4urg6yzg4wkyalijhd7o7jt374xucbawmw5i7xr4wbzpleq" /></p>

## Quickstart

```html
<head>
  <script
    type="module"
    src="https://cdn.jsdelivr.net/npm/@numbersprotocol/capture-eye/capture-eye.bundled.js"
  ></script>
</head>
<body>
  <capture-eye
    nid="bafybeic3lj3rxypkmlgznch54fuvr563z6wugewkqm5eo2okqnagaq6oou"
    prefetch="true"
  >
    <img
      width="600px"
      src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeic3lj3rxypkmlgznch54fuvr563z6wugewkqm5eo2okqnagaq6oou"
    />
  </capture-eye>
</body>
```

Visit the [interactive playground](https://playcode.io/capture_eye_demo) for the live demo.

## Component attributes

| Attribute Name  | Required | Description                                                                                                                       | Example                                                       |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `nid`           | true     | The unique [Nid](https://docs.numbersprotocol.io/introduction/numbers-protocol/defining-web3-assets/numbers-id-nid) of the asset. | `bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe` |
| `prefetch`      | false    | If set to `true`, the component will start fetching asset data when added to the DOM. Default is `false`.                         | `false`                                                       |
| `capture_token` | false    | The authentication token required to access private assets.                                                                       | `false`                                                       |

## Integration with Frontend Frameworks

Capture Eye has been designed as a web component to facilitate seamless integration with both vanilla HTML and various frontend frameworks.

- [Vanilla HTML](#vanilla-html)

- [React](#react)

- [Angular](#angular)

- [Vue](#vue)

### Vanilla HTML

The most simple way of adding Capture Eye to a webpage is by importing via CDN and add the component tag:

```html
<head>
  <script
    type="module"
    src="https://cdn.jsdelivr.net/npm/@numbersprotocol/capture-eye/capture-eye.bundled.js"
  ></script>
</head>
<body>
  <capture-eye
    nid="bafybeic3lj3rxypkmlgznch54fuvr563z6wugewkqm5eo2okqnagaq6oou"
    prefetch="true"
  >
    <img
      width="600px"
      src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeic3lj3rxypkmlgznch54fuvr563z6wugewkqm5eo2okqnagaq6oou"
    />
  </capture-eye>
</body>
```

For a full example, see the [example html](dev/index.html).

To run a development server and view the example HTML in your browser, execute the following command:

```bash
npm run dev
```

### React

To add Capture Eye to a React application, first install the packages:

```bash
npm i @numbersprotocol/capture-eye @lit/react
```

Add the following code to define a React component for Capture Eye:

```ts
import React from 'react';
import { createComponent } from '@lit/react';
import { CaptureEye } from '@numbersprotocol/capture-eye';

const CaptureEyeComponent = createComponent({
  tagName: 'capture-eye',
  elementClass: CaptureEye,
  react: React,
  events: {
    onactivate: 'activate',
    onchange: 'change',
  },
});
```

Use the CaptureEyeComponent in JSX:

```jsx
<CaptureEyeComponent nid="bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe">
  <img src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe" />
</CaptureEyeComponent>
```

### Angular

To add Capture Eye to an Angular application, first install the packages:

```bash
npm i @numbersprotocol/capture-eye @webcomponents/webcomponentsjs
```

Add the webcomponents loader to the `script` section in `angular.json`:

```json
...
"scripts": [
  "node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"
],
...
```

Make sure `CUSTOM_ELEMENTS_SCHEMA` is set in your module:

```ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  ...
})
```

Finally, import the Capture Eye package in your `*.component.ts` and add the `<capture-eye nid="..."></capture-eye>` template tag to your component:

```ts
import '@numbersprotocol/capture-eye';
```

```html
<capture-eye
  nid="bafybeic3lj3rxypkmlgznch54fuvr563z6wugewkqm5eo2okqnagaq6oou"
  prefetch="true"
>
  <img
    width="600px"
    src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeic3lj3rxypkmlgznch54fuvr563z6wugewkqm5eo2okqnagaq6oou"
  />
</capture-eye>
```

### Vue

For Vue users, the usage is similar to use native HTML elements. The official Vue doc provides a guide on [Using Vue with Web Components](https://vuejs.org/guide/extras/web-components.html).

To add Capture Eye to a SFC, simply import the Capture Eye package in the script setup and add the component tag in the template:

```vue
<script setup>
import '@numbersprotocol/capture-eye';
</script>

<template>
  <main>
    <capture-eye
      nid="bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy"
      prefetch="true"
    >
      <img
        width="600"
        src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeic3lj3rxypkmlgznch54fuvr563z6wugewkqm5eo2okqnagaq6oou"
      />
    </capture-eye>
  </main>
</template>
```
