interface Url {
  dataApi: string;
  ipfsGateway: string;
  explorer: string;
  profile: string;
  collect: string;
  captureEyeIcon: string;
  closeIcon: string;
  contentCopyIcon: string;
  helpIcon: string;
  previewIcon: string;
}

interface Text {
  not_available: string;
}

interface ConstantType {
  url: Url;
  text: Text;
}

export const Constant: ConstantType = {
  url: {
    dataApi: 'https://eognt1jfpe04mq8.m.pipedream.net',
    ipfsGateway: 'https://ipfs-pin.numbersprotocol.io/ipfs',
    explorer: 'https://mainnet.num.network',
    profile: 'https://verify.numbersprotocol.io/asset-profile?nid=',
    collect: 'https://captureappiframe.numbersprotocol.io/checkout',
    captureEyeIcon: `https://ipfs-pin.numbersprotocol.io/ipfs/bafkreicf4sruldnh4g3bmxnqr6zjgfzfgvbqoa5iy2jncewqqlgg75utd4`,
    closeIcon: 'https://c.animaapp.com/twFYQx58/img/close@2x.png',
    contentCopyIcon: 'https://c.animaapp.com/twFYQx58/img/content-copy@2x.png',
    helpIcon: 'https://c.animaapp.com/twFYQx58/img/help-2@2x.png',
    previewIcon: 'https://c.animaapp.com/twFYQx58/img/placeholder-image.png',
  },
  text: {
    not_available: 'N/A',
  },
};
