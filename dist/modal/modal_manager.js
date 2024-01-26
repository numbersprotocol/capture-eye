export class ModalManager {
    constructor() {
        this.modalElement = null;
        this.renderedOnce = false;
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
    updateModal(nid, show = true) {
        console.log('update modal', show);
        if (this.modalElement) {
            console.log('found modalElement', this.modalElement);
            // If nid changed or has not yet rendered for first time, create iframe
            if (this.modalElement.nid !== nid || !this.renderedOnce) {
                // Remove existing iframe if it exists
                const existingIframe = this.modalElement.shadowRoot?.querySelector('.capture-eye-iframe');
                if (existingIframe) {
                    existingIframe.remove();
                }
                // Set new nid and create a new iframe
                this.modalElement.nid = nid;
                this.createIframe(nid);
                this.renderedOnce = true;
                console.log('render nid', nid);
            }
            if (show)
                this.modalElement.modalHidden = false;
        }
    }
    hideModal() {
        if (this.modalElement) {
            this.modalElement.modalHidden = true;
        }
    }
    createIframe(nid) {
        if (this.modalElement && this.modalElement.shadowRoot) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://verify.numbersprotocol.io/version-test/asset-profile/?nid=${nid}&iframe=yes`;
            iframe.width = '80%';
            iframe.height = '80%';
            iframe.allowFullscreen = true;
            iframe.className = 'capture-eye-iframe';
            // Find the modal-content div and append the iframe to it
            const modalContentDiv = this.modalElement.shadowRoot.querySelector('.modal-content');
            console.log('modalContentDiv', modalContentDiv);
            if (modalContentDiv) {
                modalContentDiv.appendChild(iframe);
                console.log('append iframe');
            }
        }
    }
}
//# sourceMappingURL=modal_manager.js.map