import { Popup } from './Popup.js';

export class PopupConfirmForm extends Popup {
    constructor({ popupSelector, formSubmit, submitText }) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._submitText = submitText;
        this._submit = this._popupSelector.querySelector('.popup__submit');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit();
        });
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submit.textContent = "Сохранение...";
        } else { 
            this._submit.textContent = this._submitText;
          }
      }
}