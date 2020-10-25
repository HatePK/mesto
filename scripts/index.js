import { popupElements, initialCards } from './config.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const addPlacePopup = document.querySelector('.popup_type_new-place');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const imagePopup = document.querySelector('.popup_type_image-big');
const formEditButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const addPlaceCloseButton = addPlacePopup.querySelector('.popup__close-button');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');
const bigImageCloseButton = imagePopup.querySelector('.popup__close-button');
const editFormSubmitButton = editProfilePopup.querySelector('.popup__submit');
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

function handleOpenPopup(name, link) {
    const popupImage = imagePopup.querySelector('.popup__image');
      popupImage.src = link;
      popupImage.alt = name;
      imagePopup.querySelector('.popup__image-title').textContent = name;
      openPopup(imagePopup);
}

initialCards.forEach((item)=>{
    const card = new Card(item, elementTemplate, handleOpenPopup);
    const element = card.getElement();
    cardsList.append(element);
})

// валидация
const formEditProfileValidation = new FormValidator (popupElements.formEditProfileSelector, popupElements);
formEditProfileValidation.enableValidation();

const formNewPlaceValidation = new FormValidator (popupElements.formNewPlaceSelector, popupElements);
formNewPlaceValidation.enableValidation();

// добавление карточки
const addCard = (event)=>{
    event.preventDefault();
    const card = new Card({name: placeInput.value, link: urlImageInput.value}, elementTemplate, handleOpenPopup);
    const element = card.getElement();
    cardsList.prepend(element);
    escapePopup(addPlacePopup);
    placeInput.value = null;
    urlImageInput.value = null;
    formNewPlaceValidation.disableSubmitButton();
}

addPlacePopup.addEventListener('submit', addCard);

addPlaceCloseButton.addEventListener('click', () => {
    escapePopup(addPlacePopup);
});

addPlaceButton.addEventListener('click', () => {
    openPopup(addPlacePopup);
})

const openPopup = (popupModal) => {
    popupModal.classList.add('popup_opened');
    document.addEventListener('keydown', addEscPopup);
}

const escapePopup = (popupModal) => {
    popupModal.classList.remove('popup_opened');
    document.removeEventListener('keydown', addEscPopup);
}

const addEscPopup = function (evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if(evt.key === 'Escape') { 
        escapePopup(popupOpened);
    }
}

// Редактирование профиля
formEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
    openPopup(editProfilePopup);
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    escapePopup(editProfilePopup);
}

editFormSubmitButton.addEventListener('click', formSubmitHandler);
editProfileCloseButton.addEventListener('click', () => {
    escapePopup(editProfilePopup);
});

overlayEditCard.addEventListener('click', () => {
    escapePopup(editProfilePopup);
});


overlayAddCard.addEventListener('click', () => {
    escapePopup(addPlacePopup);
});

// Попап увеличения карточки
bigImageCloseButton.addEventListener('click', () => {
    escapePopup(imagePopup);
});

overlayImage.addEventListener('click', () => {
    escapePopup(imagePopup);
});
