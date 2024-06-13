export declare class ModalManager {
    private static instance;
    private modalElement;
    private currentButtonElement;
    private constructor();
    get isHidden(): boolean;
    get nid(): string;
    static getInstance(): ModalManager;
    initializeModal(): void;
    updateModal(nid: string, layout: string, buttonElement: HTMLElement, show?: boolean): void;
    hideModal(): void;
    private positionModal;
    private setFocus;
    private unfocusCurrentButton;
    private removeModal;
    private fetchAssetData;
    private updateModalProperties;
}
//# sourceMappingURL=modal-manager.d.ts.map