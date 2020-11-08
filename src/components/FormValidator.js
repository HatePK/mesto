export class FormValidator {
    constructor(formSelector, popupElements){
        this._formElement = document.querySelector(formSelector);
        this._formSelector = formSelector;
        this._inputSelector = popupElements.inputSelector;
        this._inputValidClass = popupElements.inputValidClass;
        this._inputErrorClass = popupElements.inputErrorClass;
        this._submitButtonSelector = popupElements.submitButtonSelector;
        this._inactiveButtonClass = popupElements.inactiveButtonClass;
        this._activeButtonClass = popupElements.activeButtonClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage){ 
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`); // НАХОЖУ ЭЛЕМЕНТ В КОТОРОМ ВЫВОД ОШИБКИ
        inputElement.classList.add(this._inputErrorClass); // ДОБАВЛЯЮ ПОЛЮ ВВОДА ОШИБОЧНЫЙ КЛАСС
        inputElement.classList.remove(this._inputValidClass); // УДАЛЯЮ КЛАСС ГДЕ ВСЕ ОК
        errorElement.textContent = errorMessage; // ВЫВОЖУ СООБЩЕНИЕ ОБ ОШИБКЕ
    }

    _hideInputError(inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        inputElement.classList.add(this._inputValidClass);
        errorElement.textContent = '';
    }

    _getErrorMessage(inputElement){ // ПОЛУЧЕНИЕ СООБЩЕНИЯ ОБ ОШИБКЕ В ПОЛЕ
        return inputElement.validationMessage;
    }

    _checkInputValidity(inputElement){ // ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ ФОРМЫ
        const isInputInvalid = !inputElement.validity.valid;

        if (isInputInvalid) { // ЕСЛИ НЕВАЛИДНА
            const errorMessage = this._getErrorMessage(inputElement); // ПЕРЕМЕННАЯ ДЛЯ СООБЩЕНИЯ ОШИБКИ
            this._showInputError(inputElement, errorMessage); // ПОКАЗАТЬ ОШИБКУ
        } else {
            this._hideInputError(inputElement); // ИНАЧЕ СКРЫТЬ ОШИБКУ
        };
    }

    _isFormValid(inputList){ // ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ
        return inputList.some((inputElement) => !inputElement.validity.valid);
    };

    _toggleButtonState(){ // ФУНКЦИЯ ПРОВЕРКИ BUTTON
        if (this._isFormValid(this._inputList)) { // ЕСЛИ ФОРМА НЕВАЛИДНА ТО
            this._buttonElement.classList.add(this._inactiveButtonClass); // ДОБАВЛЯЕМ НЕАКТИВНЫЙ КЛАСС
            this._buttonElement.classList.remove(this._activeButtonClass); // УДАЛЯЕМ АКТИВНЫЙ
            this._buttonElement.disabled = true; // КНОПКА ДИЗЕЙБЛЕД
        } else { // ЕСЛИ ВАЛИДНА ТО
            this._buttonElement.classList.remove(this._inactiveButtonClass); // УДАЛЯЕМ НЕАКТИВНЫЙ КЛАСС
            this._buttonElement.classList.add(this._activeButtonClass);// ДОБАВЛЯЕМ АКТИВНЫЙ
            this._buttonElement.disabled = false; // КНОПКА АКТИВНА
        }
    }

    _setEventListeners(){ // ФУНКЦИЯ ПРИНИМАЕТ ФОРМУ И СЕЛЕКТОРЫ
        this._inputList.forEach((inputElement) => { // ДЛЯ КАЖДОГО ИНПУТА В ФОРМЕ ДЕЛАЕМ:
            inputElement.addEventListener('input', () => { // ПРИ НАЧАЛЕ ВВОДА ЗАПУСКАЮТСЯ ФУНКЦИИ:
                this._checkInputValidity(inputElement); // ПРОВЕРКА ИНПУТА
                this._toggleButtonState(); // ПРОВЕРКА САБМИТА
            });
        });
    };

    disableSubmitButton() {
        this._buttonElement.classList.remove('popup__submit_active');
        this._buttonElement.classList.add('popup__submit_disabled');
        this._buttonElement.disabled = true;
    };

    enableValidation() {
        const submitFormHandler = (event) => {
            event.preventDefault();
        };
        this._formElement.addEventListener('submit', submitFormHandler);
        this._setEventListeners(); // ВЫПОЛНЯЕМ ФУНКЦИИ ИНПУТА И САБМИТА
    };
};
