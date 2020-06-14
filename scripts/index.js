const form = document.querySelector('.form');
const formEditButton = document.querySelector('.profile__edit-button');
const formCloseButton = form.querySelector('.form__close-button');
let formSubmitButton = form.querySelector('.form__submit');
let nameInput = document.querySelector('.form__field-name');
let jobInput = document.querySelector('.form__field-job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent

const formToggle = function () {
    form.classList.toggle('form_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    form.classList.remove('form_opened');
}

formSubmitButton.addEventListener('click', formSubmitHandler);
formEditButton.addEventListener('click', formToggle)
formCloseButton.addEventListener('click', formToggle)