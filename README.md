# Capture Eye

[![](https://data.jsdelivr.com/v1/package/npm/@numbersprotocol/capture-eye/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@numbersprotocol/capture-eye)

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
    src="https://cdn.jsdelivr.net/npm/@numbersprotocol/capture-eye@latest/dist/capture-eye.bundled.js"
  ></script>
</head>
<body>
  <capture-eye
    nid="bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy"
  >
    <media-viewer
      width="600px"
      src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy"
    />
  </capture-eye>
</body>
```

The Capture Eye comes with a helper component `media-viewer` that could automatically detect the source url file type and display image or video respectively. It is NOT necessary to use `<media-viewer>` component. If you wish to use your own component to display the asset, you may use `<img>`, `<video>` or any other custom component as the child element of `<capture-eye>`.

Visit the [interactive playground](https://playcode.io/capture_eye_demo) for the live demo.

## Component attributes

| Attribute Name       | Required | Description                                                                                                                       | Example                                                                                         |
| -------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `nid`                | true     | The unique [Nid](https://docs.numbersprotocol.io/introduction/numbers-protocol/defining-web3-assets/numbers-id-nid) of the asset. | `<capture-eye nid="bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy"></capture-eye>` |
| `layout`             | false    | Decides which layout to display. Default value is `original`. Additional option includes `curated`.                               | `<capture-eye nid="..." layout="curated"></capture-eye>`                                        |
| `eng-img`            | false    | Override the engagement zone banner image. Recommended size is 400x200 px but any image with width >= 320px should work.          | `<capture-eye nid="..." eng-img="https://my.image.url/image.png"></capture-eye>`                |
| `eng-link`           | false    | Override the engagement zone banner link.                                                                                         | `<capture-eye nid="..." eng-link="https://my.website.url"></capture-eye>`                       |
| `action-button-text` | false    | Override the default action button text (`View More`).                                                                            | `<capture-eye nid="..." action-button-text="Collect"></capture-eye>`                            |
| `action-button-link` | false    | Override the default action button link to Capture website.                                                                       | `<capture-eye nid="..." action-button-link="https://my.website.url"></capture-eye>`             |

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
    src="https://cdn.jsdelivr.net/npm/@numbersprotocol/capture-eye@latest/dist/capture-eye.bundled.js"
  ></script>
</head>
<body>
  <capture-eye
    nid="bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy"
  >
    <img
      width="600px"
      src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy"
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
<CaptureEyeComponent nid="bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy">
  <img src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy" />
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
<capture-eye nid="bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy">
  <img
    width="600px"
    src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy"
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
    >
      <img
        width="600"
        src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy"
      />
    </capture-eye>
  </main>
</template>
```

## Style customization

Capture Eye utilizes shadow DOM for encapsulation as a web component. However, if needed, the encapsulated styles could still be modified for any specific customization need. The section uses vanilla HTML/JavaScript to demonstrate how it is done. For different frontend frameworks it could also be done easily following the same logic.

To customize the Capture Eye button, access and modify the shadow DOM of Capture Eye after it is loaded.

Example of changing the icon and width/height:

```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const captureEyeElements = document.querySelectorAll('capture-eye');

    captureEyeElements.forEach((element) => {
      const img = element.shadowRoot.querySelector('.capture-eye-button img');
      img.src =
        'https://ipfs-pin.numbersprotocol.io/ipfs/bafybeief3yriouin54tzub5otnzka6muacrsu32tl2vxnaexgffizdxxqy';
      img.style.width = '30px';
      img.style.height = '30px';
    });
  });
</script>
```

In contrast to Capture Eye button, the Capture Eye modal is not a child element of it, instead it is injected to document root to act as a singleton and ensure it is not affected by parent element's inheritable styles, such as CSS transform.

Example of changing the modal background color:

```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const captureEyeModal = document.querySelector('capture-eye-modal');
    const modalContentDiv =
      captureEyeModal.shadowRoot.querySelector('.modal-container');
    modalContentDiv.style.background = 'midnightblue';
  });
</script>
```
