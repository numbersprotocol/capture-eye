export declare class ModalManager {
    private static instance;
    private modalElement;
    private constructor();
    get isHidden(): boolean;
    get nid(): string;
    static getInstance(): ModalManager;
    initializeModal(): void;
    updateModal(nid: string, layout: string, position: {
        top: number;
        left: number;
    }): void;
    private positionModal;
    hideModal(): void;
    private fetchAssetData;
    private updateModalProperties;
}
//# sourceMappingURL=modal-manager.d.ts.map