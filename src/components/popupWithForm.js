import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ popupSelector, formSubmit, submitText }) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._inputs = this._popupSelector.querySelectorAll('.popup__field');
        this._submit = this._popupSelector.querySelector('.popup__submit');
        this._submitText = submitText;
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

    renderLoading(isLoading) {
        if (isLoading) {
            this._submit.textContent = "Сохранение...";
        } else { 
            this._submit.textContent = this._submitText;
          }
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