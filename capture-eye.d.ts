import { LitElement } from 'lit';
interface TooltipState {
    show: boolean;
    top: number;
    left: number;
}
interface TooltipStates {
    [key: string]: TooltipState;
}
export declare class CaptureEye extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Whether to display inspector panel or not.
     */
    showPanel: boolean;
    /**
     * If yes, start fetching asset data when the Capture Eye is loaded.
     * Otherwise the data will only be fetched when the panel is opened.
     */
    prefetch: boolean;
    /**
     * Nid of the asset.
     */
    nid: string;
    /**
     * Optional Capture token for accessing data from private assets.
     */
    capture_token: string;
    metadata: ({
        label: string;
        value: string;
        link: string;
        helpText?: undefined;
    } | {
        label: string;
        value: string;
        link?: undefined;
        helpText?: undefined;
    } | {
        label: string;
        value: string;
        helpText: string;
        link?: undefined;
    })[];
    private asset;
    tooltipStates: TooltipStates;
    assetDataFetched: boolean;
    assetDataNotFound: boolean;
    imageError: boolean;
    private readonly apiBaseUrl;
    private readonly ipfsGatewayBaseUrl;
    private readonly explorerBaseUrl;
    private readonly profileBaseUrl;
    private readonly captureEyeIcon;
    private readonly closeIcon;
    private readonly contentCopyIcon;
    private readonly helpIcon;
    get assetUrl(): string;
    get assetProfileUrl(): string;
    constructor();
    buttonTemplate(): import("lit-html").TemplateResult<1>;
    tooltipTemplate(label: string, helpText: string): import("lit-html").TemplateResult<1>;
    metadataTemplate(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): Promise<void>;
    private toggleShowPanel;
    private fetchAssetData;
    private showTooltip;
    private hideTooltip;
    private copyToClipboard;
    private collect;
    private setMetadata;
    private getExplorerUrl;
    private getIpfsUrl;
}
declare global {
    interface HTMLElementTagNameMap {
        'capture-eye': CaptureEye;
    }
}
export {};
//# sourceMappingURL=capture-eye.d.ts.map