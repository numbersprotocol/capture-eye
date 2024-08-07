import { LitElement } from 'lit';
export declare class CaptureEyeModal extends LitElement {
    static styles: import("lit").CSSResult;
    nid: string;
    layout: string;
    modalHidden: boolean;
    creatorName: string;
    date: string;
    headline: string;
    blockchain: string;
    transaction: string;
    thumbnailUrl: string;
    explorerUrl: string;
    assetSourceType: string;
    captureTime: string;
    backendOwnerName: string;
    usedBy: string;
    engagementImage: string;
    engagementLink: string;
    actionButtonText: string;
    actionButtonLink: string;
    imageLoaded: boolean;
    modalElement: HTMLDivElement;
    constructor();
    resetModalProps(): void;
    firstUpdated(): void;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private updateModalVisibility;
    private isOriginal;
    private renderTop;
    private renderMiddle;
    private renderBottom;
    private handleImageLoad;
    render(): import("lit-html").TemplateResult<1>;
    private hideModal;
}
declare global {
    interface HTMLElementTagNameMap {
        'capture-eye-modal': CaptureEyeModal;
    }
}
//# sourceMappingURL=modal.d.ts.map