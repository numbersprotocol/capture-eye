export class ModalManager {
    constructor() {
        this.modalElement = null;
        this.currentButtonElement = null;
    }
    get isHidden() {
        if (this.modalElement)
            return this.modalElement.modalHidden;
        return true;
    }
    static getInstance() {
        if (!ModalManager.instance) {
            ModalManager.instance = new ModalManager();
        }
        return ModalManager.instance;
    }
    initializeModal() {
        if (!this.modalElement) {
            this.modalElement = document.createElement('capture-eye-modal');
            document.body.appendChild(this.modalElement);
        }
    }
    updateModal(nid, buttonElement, show = true) {
        console.log('update modal', show);
        if (this.modalElement) {
            console.log('found modalElement', this.modalElement);
            // If the current button is clicked again, hide the modal
            if (this.currentButtonElement === buttonElement) {
                this.hideModal();
                return;
            }
            if (this.currentButtonElement &&
                this.currentButtonElement !== buttonElement) {
                // Unfocus the currently focused button and remove the modal
                this.unfocusCurrentButton();
                this.removeModal();
            }
            this.currentButtonElement = buttonElement;
            if (this.modalElement.nid !== nid) {
                this.modalElement.nid = nid;
                this.modalElement.creatorName = 'Tori Ferenc';
                this.modalElement.date = '2023/6/9 14:47';
                this.modalElement.caption =
                    'Looking inward. Photographer Tori Ferenc on a journey of self-discovery';
                this.modalElement.platform = 'Capture Dashboard';
                this.modalElement.license = 'Commercial';
                console.log('render nid', nid);
            }
            if (show) {
                this.positionModal();
                this.modalElement.modalHidden = false;
                this.setFocus(true);
            }
        }
    }
    hideModal() {
        if (this.modalElement) {
            this.modalElement.modalHidden = true;
            this.setFocus(false);
            this.currentButtonElement = null;
        }
    }
    positionModal() {
        console.log('positionModal', this.modalElement, this.currentButtonElement);
        if (this.modalElement && this.currentButtonElement) {
            const buttonRect = this.currentButtonElement.getBoundingClientRect();
            // Remove the modal from its previous parent if it has one
            if (this.modalElement.parentElement) {
                this.modalElement.parentElement.removeChild(this.modalElement);
            }
            // Append the modal element to the same parent as the button element
            this.currentButtonElement.parentElement?.appendChild(this.modalElement);
            // Now calculate the correct position
            const parentRect = this.currentButtonElement.parentElement?.getBoundingClientRect() || {
                top: 0,
                left: 0,
            };
            this.modalElement.style.position = 'absolute';
            this.modalElement.style.top = `${buttonRect.top - parentRect.top}px`;
            this.modalElement.style.left = `${buttonRect.left - parentRect.left}px`;
            console.log('Modal positioned at:', this.modalElement.style.top, this.modalElement.style.left);
        }
    }
    setFocus(focused) {
        if (this.modalElement && this.currentButtonElement) {
            if (focused) {
                this.currentButtonElement.style.zIndex = '10001';
                this.modalElement.style.zIndex = '10000';
            }
            else {
                this.currentButtonElement.style.zIndex = '1000';
                this.modalElement.style.zIndex = '1000';
            }
        }
    }
    unfocusCurrentButton() {
        if (this.currentButtonElement) {
            this.currentButtonElement.style.zIndex = '1000';
        }
    }
    removeModal() {
        if (this.modalElement && this.modalElement.parentElement) {
            this.modalElement.parentElement.removeChild(this.modalElement);
        }
    }
}
//# sourceMappingURL=modal_manager.js.map