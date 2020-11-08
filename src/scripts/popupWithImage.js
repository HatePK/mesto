import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    open(imgTxt, imgSrc) {
        const popupImage = this._popupSelector.querySelector('.popup__image');
        popupImage.src = imgSrc;
        popupImage.alt = imgTxt;
        document.querySelector('.popup__image-title').textContent = imgTxt;
        super.open();
    }
}