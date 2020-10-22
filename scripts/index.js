import { popupElements, initialCards } from './config.js';
import { Card } from './Card.js';
import { FormValidator } from './validate.js';

const addPlacePopup = document.querySelector('.popup_type_new-place');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const imagePopup = document.querySelector('.popup_type_image-big');
const form = document.querySelector('.popup');
const container = document.querySelector('.popup__container');
const formEditButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const addPlaceCloseButton = addPlacePopup.querySelector('.popup__close-button');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const ImagePopupTitle = imagePopup.querySelector('.popup__image-title');
const bigImageCloseButton = imagePopup.querySelector('.popup__close-button');
const editFormSubmitButton = editProfilePopup.querySelector('.popup__submit');
const addPlaceFormSubmitButton = addPlacePopup.querySelector('.popup__submit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = editProfilePopup.querySelector('.popup__field_type_name');
const jobInput = editProfilePopup.querySelector('.popup__field_type_job');
const placeInput = addPlacePopup.querySelector('.popup__field_type_place-name');
const urlImageInput = addPlacePopup.querySelector('.popup__field_type_place-url');
const elementTemplate = document.querySelector('.template-element').content.querySelector('.element'); 
const cardsList = document.querySelector('.elements__list');
const overlayAddCard = document.querySelector('.popup__overlay_type_new-place');
const overlayEditCard = document.querySelector('.popup__overlay_type_edit-profile');
const overlayImage = document.querySelector('.popup__overlay_type_image-big');

// отрисовка карточек
const prependTask = (element) =>{
    cardsList.prepend(element);
}

initialCards.forEach((name)=>{
    const card = new Card(name, elementTemplate, prependTask);
    const element = card.getElement();
    cardsList.append(element);
})

// добавление карточки
const addCard = (event)=>{
    event.preventDefault();
    const card = new Card({name: placeInput.value, link: urlImageInput.value}, elementTemplate, prependTask);
    const element = card.getElement();
    prependTask(element);
    togglePopup(addPlacePopup);
    placeInput.value = null
    urlImageInput.value = null
    addPlaceFormSubmitButton.classList.remove('popup__submit_active');
    addPlaceFormSubmitButton.classList.add('popup__submit_disabled');
    addPlaceFormSubmitButton.disabled = true;
}

addPlaceFormSubmitButton.addEventListener('click', addCard);

// валидация
const formEditProfileValidation = new FormValidator (popupElements.formEditProfileSelector, popupElements);
formEditProfileValidation.enableValidation();

const formNewPlaceValidation = new FormValidator (popupElements.formNewPlaceSelector, popupElements);
formNewPlaceValidation.enableValidation();

addPlaceCloseButton.addEventListener('click', () => {
    togglePopup(addPlacePopup);
});

addPlaceButton.addEventListener('click', () => {
    togglePopup(addPlacePopup);
    document.addEventListener('keydown', AddEscPopup);
})

const togglePopup = function (popupModal) {
    popupModal.classList.toggle('popup_opened')
}

const AddEscPopup = function (evt) {
    if(evt.key === 'Escape') { 
        EscapePopup(editProfilePopup);
        EscapePopup(addPlacePopup);
        EscapePopup(imagePopup);
    }
}

const EscapePopup = function (popupModal) {
    popupModal.classList.remove('popup_opened');
    document.removeEventListener('keydown', AddEscPopup);
}

// Редактирование профиля
nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent
formEditButton.addEventListener('click', () => {
    togglePopup(editProfilePopup);
    document.addEventListener('keydown', AddEscPopup);
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(editProfilePopup);
}

editFormSubmitButton.addEventListener('click', formSubmitHandler);
editProfileCloseButton.addEventListener('click', () => {
    EscapePopup(editProfilePopup);
});

overlayEditCard.addEventListener('click', () => {
    EscapePopup(editProfilePopup);
});


overlayAddCard.addEventListener('click', () => {
    EscapePopup(addPlacePopup);
});

// Попап увеличения карточки
bigImageCloseButton.addEventListener('click', () => {
    togglePopup(imagePopup);
});

overlayImage.addEventListener('click', () => {
    EscapePopup(imagePopup);
});
