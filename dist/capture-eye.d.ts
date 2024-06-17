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
    get assetUrl(): string;
    get assetProfileUrl(): string;
    constructor();
    buttonTemplate(): import("lit-html").TemplateResult<1>;
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