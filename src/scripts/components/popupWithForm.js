import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ popupSelector, formSubmit }) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._inputs = this._popupSelector.querySelectorAll('.popup__field');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputs.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        this._inputs.forEach((input) => {
            input.value = null;
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            this.close();
        });
    }
}