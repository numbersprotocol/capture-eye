export declare class ModalManager {
    private static instance;
    private modalElement;
    private currentButtonElement;
    private constructor();
    get isHidden(): boolean;
    static getInstance(): ModalManager;
    initializeModal(): void;
    updateModal(nid: string, buttonElement: HTMLElement, show?: boolean): void;
    hideModal(): void;
    private positionModal;
    private setFocus;
    private unfocusCurrentButton;
    private removeModal;
}
//# sourceMappingURL=modal_manager.d.ts.map