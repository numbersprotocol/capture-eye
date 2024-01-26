import { LitElement } from 'lit';
export declare class CaptureEyeModal extends LitElement {
    static styles: import("lit").CSSResult;
    nid: string;
    modalHidden: boolean;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    private hideModal;
}
declare global {
    interface HTMLElementTagNameMap {
        'capture-eye-modal': CaptureEyeModal;
    }
}
//# sourceMappingURL=capture-eye-modal.d.ts.map