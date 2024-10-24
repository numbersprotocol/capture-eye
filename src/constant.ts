interface Url {
  numbersWebsite: string;
  dataApi: string;
  assetApi: string;
  productApi: string;
  ipfsGateway: string;
  explorer: string;
  profile: string;
  showcase: string;
  collect: string;
  captureEyeIcon: string;
  captureEyeMobileIcon: string;
  closeIcon: string;
  mobileCloseIcon: string;
  fontFaceCssUrl: string;
  blockchainIcon: string;
  txIcon: string;
  curatorIcon: string;
  defaultEngagementImage: string;
  defaultEngagementLink: string;
}

interface Text {
  defaultCopyrightZoneTitle: string;
  numbersMainnet: string;
  viewMore: string;
  collect: string;
}

interface ConstantType {
  url: Url;
  text: Text;
  layout: Layout;
  visibility: Visibility;
}

interface Layout {
  original: string;
  curated: string;
}
interface Visibility {
  hover: string;
  always: string;
}

const numbersCdnUrl = 'https://static-cdn.numbersprotocol.io';

export const Constant: ConstantType = {
  url: {
    numbersWebsite: 'https://www.numbersprotocol.io',
    dataApi: 'https://verify.numbersprotocol.io/api/1.1/wf/captureEyeData',
    assetApi: 'https://api.numbersprotocol.io/api/v3/assets/',
    productApi: 'https://api.numbersprotocol.io/api/v3/store/products/',
    ipfsGateway: 'https://ipfs-pin.numbersprotocol.io/ipfs',
    explorer: 'https://mainnet.num.network',
    profile: 'https://asset.captureapp.xyz',
    showcase: 'https://dashboard.captureapp.xyz/showcase',
    collect: 'https://captureappiframe.numbersprotocol.io/checkout',
    captureEyeIcon: `${numbersCdnUrl}/capture-eye-blue-32x32.png`,
    captureEyeMobileIcon: `${numbersCdnUrl}/capture-eye/capture-eye-gray.svg`,
    closeIcon: `${numbersCdnUrl}/capture-eye/capture-eye-close-icon.png`,
    mobileCloseIcon: `${numbersCdnUrl}/capture-eye/capture-eye-close-gray.svg`,
    fontFaceCssUrl: `${numbersCdnUrl}/fonts/degular.css`,
    blockchainIcon: `${numbersCdnUrl}/capture-eye/capture-eye-blockchain-icon.svg`,
    txIcon: `${numbersCdnUrl}/capture-eye/capture-eye-tx-icon.svg`,
    curatorIcon: `${numbersCdnUrl}/capture-eye/capture-eye-curator-icon.png`,
    defaultEngagementImage: `${numbersCdnUrl}/capture-eye/capture-ad.png`,
    defaultEngagementLink: 'https://captureapp.xyz',
  },
  text: {
    defaultCopyrightZoneTitle: 'Produced by',
    numbersMainnet: 'Numbers Mainnet',
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
