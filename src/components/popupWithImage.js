import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor( popupSelector ) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image');
    };

    open(imgTxt, imgSrc) {
        this._popupImage.src = imgSrc;
        this._popupImage.alt = imgTxt;
        document.querySelector('.popup__image-title').textContent = imgTxt;
        super.open();
    }
}