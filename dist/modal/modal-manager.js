import { Constant } from '../constant.js';
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
    get nid() {
        return this?.modalElement?.nid ?? '';
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
    updateModal(nid, layout, buttonElement, show = true) {
        if (this.modalElement) {
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
            if (show) {
                this.positionModal();
                this.modalElement.modalHidden = false;
                this.setFocus(true);
            }
            if (this.modalElement.nid !== nid) {
                this.modalElement.nid = nid;
                this.modalElement.layout = layout;
                this.modalElement.resetModalProps();
                this.fetchAssetData(nid).then((assetData) => this.updateModalProperties(assetData));
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
    async fetchAssetData(nid) {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const response = await fetch(`${Constant.url.dataApi}?nid=${nid}`, {
                method: 'GET',
                headers,
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Error ${response.status}: ${errorResponse.message}`);
                return;
            }
            const { response: { data }, } = await response.json();
            console.debug(data);
            if (!data)
                return;
            const fullAssetTree = data.fullAssetTree || {};
            const { '_api_c2_assetTree.assetCreator': assetCreator = '', '_api_c2_assetTree.assetTimestampCreatedReadable': assetTimestamp = '', '_api_c2_assetTree.abstract': assetAbstract = '', '_api_c2_assetTree.assetSourceType': assetSourceType = '', '_api_c2_assetTree.usedBy': assetUsedBy = '', } = fullAssetTree;
            const assetData = {
                assetCreator,
                assetTimestamp,
                assetAbstract,
                assetInitialTransaction: data.initial_transaction ?? '',
                assetThumbnailUrl: data.thumnail_url ?? '',
                explorerUrl: data.initial_transaction
                    ? `${Constant.url.explorer}/tx/${data.initial_transaction}`
                    : '',
                assetSourceType,
                assetCaptureTime: data.integrity_capture_time ?? '',
                assetBackendOwnerName: data.backend_owner_name ?? '',
                assetUsedBy,
            };
            console.debug(assetData);
            return assetData;
        }
        catch (error) {
            console.error('Fetch error:', error);
            return;
        }
    }
    updateModalProperties(assetData) {
        if (!this.modalElement || !assetData)
            return;
        this.modalElement.creatorName = assetData.assetCreator;
        this.modalElement.date = assetData.assetTimestamp;
        this.modalElement.abstract = assetData.assetAbstract;
        this.modalElement.blockchain = 'Numbers Mainnet';
        this.modalElement.transaction = assetData.assetInitialTransaction;
        this.modalElement.thumbnailUrl = assetData.assetThumbnailUrl;
        this.modalElement.explorerUrl = assetData.explorerUrl;
        this.modalElement.assetSourceType = assetData.assetSourceType;
        this.modalElement.captureTime = assetData.assetCaptureTime;
        this.modalElement.backendOwnerName = assetData.assetBackendOwnerName;
        this.modalElement.usedBy = assetData.assetUsedBy;
        this.modalElement.bannerImageSrc =
            'https://static-cdn.numbersprotocol.io/collab/defiance_media_banner.webp';
        this.modalElement.bannerLink = 'https://defiance.media/';
    }
}
//# sourceMappingURL=modal-manager.js.map