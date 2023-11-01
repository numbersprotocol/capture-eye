# Capture Eye

[Capture Eye](https://captureapp.xyz/products/eye) widget seamlessly integrates into your website, facilitating secure and transparent provenance display and purchases of digital content directly from the creator.

- Easily integrate with your digital products
  - Capture Eye effortlessly blends with your existing platforms, elevating your content's value and trustworthiness.
- Decentralized storage of the actual media asset
  - Secure, immutable and long-lasting preservation of your original digital assets, enhancing their credibility and authenticity.

<p align="center"><img src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeiahjvz4urg6yzg4wkyalijhd7o7jt374xucbawmw5i7xr4wbzpleq" /></p>

## Usage

### HTML

See the [example html](dev/index.html).

To run a dev server and view the example HTML in browser, run `npm run dev`.

### React

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

```
<CaptureEyeComponent nid="bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe">
    <img src="https://ipfs-pin.numbersprotocol.io/ipfs/bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe" />
</CaptureEyeComponent>
```

### Component attributes

| Attribute Name  | Required | Description                                                                                                   | Example                                              |
|-----------------|----------|---------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| `nid`           | true     | The unique [Nid](https://docs.numbersprotocol.io/introduction/numbers-protocol/defining-web3-assets/numbers-id-nid) of the asset.                                                                   | `bafybeigppahabe4x6r52jyvh2k7u7udpxm2vciqcamzzuung7rhfe6pkbe`  |
| `prefetch`      | false    | If set to `true`, the component will start fetching asset data when added to the DOM. Default is `false`.  | `false`                                              |
| `capture_token` | false    | The authentication token required to access private assets.                                                 | `false`                                              |
