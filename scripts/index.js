const form = document.querySelector('.popup');
const formEditButton = document.querySelector('.profile__edit-button');
const formCloseButton = form.querySelector('.popup__close-button');
let formSubmitButton = form.querySelector('.popup__submit');
let nameInput = document.querySelector('.popup__field-name');
let jobInput = document.querySelector('.popup__field-job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent

const formToggle = function () {
    form.classList.toggle('popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    form.classList.remove('popup_opened');
}

formSubmitButton.addEventListener('click', formSubmitHandler);
formEditButton.addEventListener('click', formToggle)
formCloseButton.addEventListener('click', formToggle)