interface Url {
    numbersWebsite: string;
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
}
interface ConstantType {
    url: Url;
    text: Text;
    layout: Layout;
}
export interface Layout {
    original: string;
    curated: string;
}
export declare const Constant: ConstantType;
export {};
//# sourceMappingURL=constant.d.ts.map