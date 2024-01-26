import { LitElement } from 'lit';
export declare class CaptureEye extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * If yes, start fetching asset data when the Capture Eye is loaded.
     * Otherwise the data will only be fetched when the panel is opened.
     */
    prefetch: boolean;
    /**
     * Nid of the asset.
     */
    nid: string;
    get assetUrl(): string;
    get assetProfileUrl(): string;
    constructor();
    buttonTemplate(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): Promise<void>;
    handleMouseOver(): void;
    private showModal;
}
declare global {
    interface HTMLElementTagNameMap {
        'capture-eye': CaptureEye;
    }
}
//# sourceMappingURL=capture-eye.d.ts.map