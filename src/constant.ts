interface Url {
  numbersWebsite: string;
  dataApi: string;
  productApi: string;
  ipfsGateway: string;
  explorer: string;
  profile: string;
  collect: string;
  captureEyeIcon: string;
  closeIcon: string;
  contentCopyIcon: string;
  helpIcon: string;
  previewIcon: string;
  fontFaceCssUrl: string;
  blockchainIcon: string;
  txIcon: string;
  curatorIcon: string;
  defaultEngagementImage: string;
  defaultEngagementLink: string;
}

interface Text {
  not_available: string;
  loading: string;
  viewMore: string;
  collect: string;
}

interface ConstantType {
  url: Url;
  text: Text;
  layout: Layout;
  visibility: Visibility;
}

export interface Layout {
  original: string;
  curated: string;
}

interface Visibility {
  hover: string;
  always: string;
}

export const Constant: ConstantType = {
  url: {
    numbersWebsite: 'https://www.numbersprotocol.io',
    dataApi: 'https://verify.numbersprotocol.io/api/1.1/wf/captureEyeData',
    productApi: 'https://api.numbersprotocol.io/api/v3/store/products/',
    ipfsGateway: 'https://ipfs-pin.numbersprotocol.io/ipfs',
    explorer: 'https://mainnet.num.network',
    profile: 'https://verify.numbersprotocol.io/asset-profile',
    collect: 'https://captureappiframe.numbersprotocol.io/checkout',
    captureEyeIcon: `https://static-cdn.numbersprotocol.io/capture-eye-blue-32x32.png`,
    closeIcon:
      'https://static-cdn.numbersprotocol.io/capture-eye/capture-eye-close-icon.png',
    contentCopyIcon: 'https://c.animaapp.com/twFYQx58/img/content-copy@2x.png',
    helpIcon: 'https://c.animaapp.com/twFYQx58/img/help-2@2x.png',
    previewIcon: 'https://c.animaapp.com/twFYQx58/img/placeholder-image.png',
    fontFaceCssUrl: 'https://static-cdn.numbersprotocol.io/fonts/degular.css',
    blockchainIcon:
      'https://static-cdn.numbersprotocol.io/capture-eye/capture-eye-blockchain-icon.svg',
    txIcon:
      'https://static-cdn.numbersprotocol.io/capture-eye/capture-eye-tx-icon.svg',
    curatorIcon:
      'https://static-cdn.numbersprotocol.io/capture-eye/capture-eye-curator-icon.png',
    defaultEngagementImage:
      'https://static-cdn.numbersprotocol.io/capture-eye/capture-ad.png',
    defaultEngagementLink: 'https://captureapp.xyz',
  },
  text: {
    not_available: 'N/A',
    loading: 'Loading...',
    viewMore: 'View More',
    collect: 'Collect',
  },
  layout: {
    original: 'original',
    curated: 'curated',
  },
  visibility: {
    hover: 'hover',
    always: 'always',
  },
};
