export declare class ModalManager {
    private static instance;
    private modalElement;
    private renderedOnce;
    private constructor();
    get isHidden(): boolean;
    static getInstance(): ModalManager;
    initializeModal(): void;
    updateModal(nid: string, show?: boolean): void;
    hideModal(): void;
    private createIframe;
}
//# sourceMappingURL=modal_manager.d.ts.map