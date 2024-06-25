import { LitElement } from 'lit';
export declare class CaptureEye extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Nid of the asset.
     */
    nid: string;
    /**
     * layout name of the asset. Options: original, curated
     */
    layout: string;
    /**
     * Url of the banner image.
     */
    bannerImage: string;
    /**
     * Url of the banner link.
     */
    bannerLink: string;
    get assetUrl(): string;
    get assetProfileUrl(): string;
    constructor();
    buttonTemplate(): import("lit-html").TemplateResult<1> | null;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): Promise<void>;
    private showModal;
    private getButtonElement;
    private handleMouseEnter;
    private handleMouseLeave;
    private setButtonActive;
}
declare global {
    interface HTMLElementTagNameMap {
        'capture-eye': CaptureEye;
    }
}
//# sourceMappingURL=capture-eye.d.ts.map