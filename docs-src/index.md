---
layout: page.11ty.cjs
title: <capture-eye> ⌲ Home
---

# &lt;capture-eye>

`<capture-eye>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<capture-eye>` is just an HTML element. You can it anywhere you can use HTML!

```html
<capture-eye
  nid="bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe"
></capture-eye>
```

  </div>
  <div>

<capture-eye></capture-eye>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<capture-eye>` can be configured with attributed in plain HTML.

```html
<capture-eye
  nid="bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe"
></capture-eye>
```

  </div>
  <div>

<capture-eye nid="bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe" prefetch="true"></capture-eye>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<capture-eye>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import { html, render } from 'lit-html';

const nid = 'bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe';

render(
  html`
    <h2>This is a &lt;capture-eye&gt;</h2>
    <capture-eye .nid=${nid}></capture-eye>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;capture-eye&gt;</h2>
<capture-eye nid="bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe"></capture-eye>

  </div>
</section>
