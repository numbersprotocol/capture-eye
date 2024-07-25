export declare class ModalManager {
    private static instance;
    private modalElement;
    private constructor();
    get nid(): string;
    static getInstance(): ModalManager;
    initializeModal(): void;
    updateModal(nid: string, layout: string, engagementImage: string, engagementLink: string, actionButtonText: string, actionButtonLink: string, position: {
        top: number;
        left: number;
    }): void;
    updateModalWithDelay(nid: string, layout: string, engagementImage: string, engagementLink: string, actionButtonText: string, actionButtonLink: string, position: {
        top: number;
        left: number;
    }): void;
    private remToPixels;
    private positionModal;
    hideModal(): void;
    private fetchAssetData;
    private updateModalProperties;
}
//# sourceMappingURL=modal-manager.d.ts.map