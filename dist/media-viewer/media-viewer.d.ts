import { LitElement } from 'lit';
export declare class MediaViewer extends LitElement {
    static styles: import("lit").CSSResult;
    src: string;
    width: string;
    height: string;
    controls: boolean;
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    private mimeType;
    connectedCallback(): void;
    determineFileType(): Promise<void>;
    isImageMimeType(mimeType: string): boolean;
    isVideoMimeType(mimeType: string): boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'media-viewer': MediaViewer;
    }
}
//# sourceMappingURL=media-viewer.d.ts.map