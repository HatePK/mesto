const object = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    inputValidClass: 'popup__field_valid',
    inputErrorClass: 'popup__field_invalid',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    activeButtonClass: 'popup__submit_active'
}

const enableValidation = ({ formSelector, inputSelector, inputValidClass, inputErrorClass, submitButtonSelector, inactiveButtonClass, activeButtonClass }) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const inputs = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonSubmit = formElement.querySelector(submitButtonSelector);

        inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', (evt) => {
                const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

                if (inputElement.validity.valid) {
                    inputElement.classList.remove(inputErrorClass);
                    inputElement.classList.add(inputValidClass);
                    errorElement.textContent = '';
                } else {
                    inputElement.classList.add(inputErrorClass);
                    inputElement.classList.remove(inputValidClass);
                    errorElement.textContent = inputElement.validationMessage;
                };

                const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
                
                if (isFormValid) {
                    buttonSubmit.classList.add(inactiveButtonClass);
                    buttonSubmit.classList.remove(activeButtonClass);
                    buttonSubmit.disabled = true;
                } else {
                    buttonSubmit.classList.remove(inactiveButtonClass);
                    buttonSubmit.classList.add(activeButtonClass);
                    buttonSubmit.disabled = false;
                };
            });
        });
    });
};

enableValidation(object);