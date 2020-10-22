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

    _isFormValid(inputs){ // ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ
        return inputs.some((inputElement) => !inputElement.validity.valid);
    };

    _toggleButtonState(inputs, buttonSubmit){ // ФУНКЦИЯ ПРОВЕРКИ BUTTON
        if (this._isFormValid(inputs)) { // ЕСЛИ ФОРМА НЕВАЛИДНА ТО
            buttonSubmit.classList.add(this._inactiveButtonClass); // ДОБАВЛЯЕМ НЕАКТИВНЫЙ КЛАСС
            buttonSubmit.classList.remove(this._activeButtonClass); // УДАЛЯЕМ АКТИВНЫЙ
            buttonSubmit.disabled = true; // КНОПКА ДИЗЕЙБЛЕД
        } else { // ЕСЛИ ВАЛИДНА ТО
            buttonSubmit.classList.remove(this._inactiveButtonClass); // УДАЛЯЕМ НЕАКТИВНЫЙ КЛАСС
            buttonSubmit.classList.add(this._activeButtonClass);// ДОБАВЛЯЕМ АКТИВНЫЙ
            buttonSubmit.disabled = false; // КНОПКА АКТИВНА
        }
    }

    _setEventListeners(){ // ФУНКЦИЯ ПРИНИМАЕТ ФОРМУ И СЕЛЕКТОРЫ
        const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector)); // МАССИВ ИЗ ИНПУТОВ
        const buttonSubmit = this._formElement.querySelector(this._submitButtonSelector); // НАХОДИМ КНОПКУ

        inputs.forEach((inputElement) => { // ДЛЯ КАЖДОГО ИНПУТА В ФОРМЕ ДЕЛАЕМ:
            inputElement.addEventListener('input', () => { // ПРИ НАЧАЛЕ ВВОДА ЗАПУСКАЮТСЯ ФУНКЦИИ:
                this._checkInputValidity(inputElement); // ПРОВЕРКА ИНПУТА
                this._toggleButtonState(inputs, buttonSubmit); // ПРОВЕРКА САБМИТА
            });
        });
    };

    enableValidation = () => {
        const submitFormHandler = (event) => {
            event.preventDefault();
        };
        
        this._formElement.addEventListener('submit', submitFormHandler);
        this._setEventListeners(); // ВЫПОЛНЯЕМ ФУНКЦИИ ИНПУТА И САБМИТА
    };
};
