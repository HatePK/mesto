import './index.css';

import { popupElements, initialCards } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const formEditButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const nameInput = editProfilePopup.querySelector('.popup__field_type_name');
const jobInput = editProfilePopup.querySelector('.popup__field_type_job');
const elementTemplate = document.querySelector('.template-element').content.querySelector('.element'); 
const cardsList = document.querySelector('.elements__list');
const userName = popupElements.userName;
const userDescription = popupElements.userDescription;
const handleOpenPopup = (imgTxt, imgSrc) => popupWithImage.open(imgTxt, imgSrc);

const popupWithImage = new PopupWithImage (popupElements.imagePopup);
const rendererCards = new Section ({
    items: initialCards,
    renderer: (item) => {
        const cardItem = new Card(item.name, item.link, elementTemplate, handleOpenPopup);
        const element = cardItem.getElement();
        rendererCards.addItem(element);
    }
    }, popupElements.cardsListContainer)

rendererCards.renderItems();
popupWithImage.setEventListeners();

/////////////////////////////////////
const popupWithNewPlaceForm = new PopupWithForm ({
    popupSelector: '.popup_type_new-place',
    formSubmit: (item) => {
        const card = new Card(item["place-input"], item["url-input"], elementTemplate, handleOpenPopup);
        const element = card.getElement();
        rendererCards.prependItem(element);
        formNewPlaceValidation.disableSubmitButton();
    } 
});

addPlaceButton.addEventListener('click', () => {
    popupWithNewPlaceForm.open()
})

popupWithNewPlaceForm.setEventListeners();

//////////////////////////////////

const userInfo = new UserInfo({userName, userDescription});
const popupWithEditForm = new PopupWithForm ({
    popupSelector: '.popup_type_edit-profile',
    formSubmit: (item) => {
        userInfo.setUserInfo(item["name-input"], item["job-input"]);
        formEditProfileValidation.disableSubmitButton();
    } 
});

formEditButton.addEventListener('click', () => {
    popupWithEditForm.open()
    const userActualInfo = userInfo.getUserInfo();
    nameInput.value = userActualInfo['name'];
    jobInput.value = userActualInfo['description'];
})

popupWithEditForm.setEventListeners();

// валидация
const formEditProfileValidation = new FormValidator (popupElements.formEditProfileSelector, popupElements);
formEditProfileValidation.enableValidation();

const formNewPlaceValidation = new FormValidator (popupElements.formNewPlaceSelector, popupElements);
formNewPlaceValidation.enableValidation();



