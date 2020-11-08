export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._overlay = this._popupSelector.querySelector('.popup__overlay')
        this._closeButton = this._popupSelector.querySelector('.popup__close-button')
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') { 
            this.close();
        }
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
             this.close()
        });
        this._overlay.addEventListener('click',  () => {
            this.close();
        });
    }
}