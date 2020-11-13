import './index.css';

import { popupElements } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirmForm } from '../components/popupConfirmForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const formEditButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__edit-avatar');
const nameInput = editProfilePopup.querySelector('.popup__field_type_name');
const jobInput = editProfilePopup.querySelector('.popup__field_type_job');
const avaInput = editAvatarButton.querySelector('.popup__field_type_avatar-url');
const elementTemplate = document.querySelector('.template-element').content.querySelector('.element'); 
const cardsList = document.querySelector('.elements__list');
const userName = popupElements.userName;
const userDescription = popupElements.userDescription;
const userAvatar = popupElements.userAvatar;
const handleOpenPopup = (imgTxt, imgSrc) => popupWithImage.open(imgTxt, imgSrc);

const userInfo = new UserInfo({userName, userDescription, userAvatar});

const apiCards = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/cards',
    headers: {'Content-Type' : 'application/json', 'authorization': 'a985b89f-2e7b-4084-9df7-0663efbc7c3b'},
})
const apiUserInfo = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/users/me',
    headers: {'Content-Type' : 'application/json', 'authorization': 'a985b89f-2e7b-4084-9df7-0663efbc7c3b'},
})
const apiDelCard = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/cards',
    headers: {'Content-Type' : 'application/json', 'authorization': 'a985b89f-2e7b-4084-9df7-0663efbc7c3b'},
})

const apiAddLike = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/cards/likes',
    headers: {'Content-Type' : 'application/json', 'authorization': 'a985b89f-2e7b-4084-9df7-0663efbc7c3b'},
})

const apiDelLike = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/cards/likes',
    headers: {'Content-Type' : 'application/json', 'authorization': 'a985b89f-2e7b-4084-9df7-0663efbc7c3b'},
})

const apiEditAvatar = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/users/me/avatar',
    headers: {'Content-Type' : 'application/json', 'authorization': 'a985b89f-2e7b-4084-9df7-0663efbc7c3b'},
})

apiUserInfo.userInfo().then((info) => {
    userInfo.setUserInfo(info.name, info.about, info.avatar, info._id);
});

const popupWithEditForm = new PopupWithForm ({
    popupSelector: '.popup_type_edit-profile',
    formSubmit: (item) => {
        popupWithEditForm.renderLoading(true);
        apiUserInfo.setUserInfo(item["name-input"], item["job-input"]).then((data) => {
            userInfo.setUserInfo(data.name, data.about, data.avatar);
            formEditProfileValidation.disableSubmitButton();
            popupWithEditForm.renderLoading(false);
        });
    },
    submitText: 'Сохранить'
});

const popupWithEditAvatarForm = new PopupWithForm ({
    popupSelector: '.popup_type_edit-avatar',
    formSubmit: (item) => {
        popupWithEditAvatarForm.renderLoading(true);
        apiEditAvatar.editAvatar(item["avatar-url"]).then((data) => {
            userInfo.setUserInfo(data.name, data.about, data.avatar);
            popupWithEditAvatarForm.renderLoading(false);
        });
    },
    submitText: 'Сохранить'
});

editAvatarButton.addEventListener('click', () => {
    popupWithEditAvatarForm.open()
})

popupWithEditAvatarForm.setEventListeners();

const popupWithConfirmForm = new PopupConfirmForm ({
    popupSelector: '.popup_type_confirm',
    formSubmit: () => {
        popupWithConfirmForm.renderLoading(true);
        apiCards.deleteCard(popupWithConfirmForm.cardId)
        .then(result => {
            document.getElementById(popupWithConfirmForm.cardId).remove();
            popupWithConfirmForm.renderLoading(false);
        })
        
    },
    submitText: 'Да'
});

const handleOpenConfirmPopup = (cardId) => { popupWithConfirmForm.cardId = cardId; popupWithConfirmForm.open();}
popupWithConfirmForm.setEventListeners();

apiCards.getCards().then((cards) => {
    const rendererCards = new Section ({
        items: cards,
        renderer: (item) => {
            const cardItem = new Card(
                item.name,
                item.link,
                item.likes, 
                item._id, 
                item.owner._id, 
                userInfo._userId, 
                apiDelCard,
                apiAddLike,
                apiDelLike,
                elementTemplate, 
                handleOpenPopup,
                handleOpenConfirmPopup);
            const element = cardItem.getElement();
            rendererCards.addItem(element);
        }
        }, popupElements.cardsListContainer)
    
    rendererCards.renderItems();
});


const popupWithNewPlaceForm = new PopupWithForm ({
    popupSelector: '.popup_type_new-place',
    formSubmit: (inputsValue) => {
        popupWithNewPlaceForm.renderLoading(true);
        apiCards.createCard(inputsValue["place-input"], inputsValue["url-input"]).then((item) => {
            const card = new Card(
                item.name,
                item.link, 
                item.likes, 
                item._id, 
                item.owner._id, 
                userInfo._userId, 
                apiDelCard,
                apiAddLike,
                apiDelLike,
                elementTemplate, 
                handleOpenPopup,
                handleOpenConfirmPopup);
            const element = card.getElement();
            document.querySelector(popupElements.cardsListContainer).prepend(element);
            formNewPlaceValidation.disableSubmitButton();
            popupWithNewPlaceForm.renderLoading(false);
        })
    },
    submitText: 'Создать'
});

addPlaceButton.addEventListener('click', () => {
    popupWithNewPlaceForm.open()
})
popupWithNewPlaceForm.setEventListeners();


const popupWithImage = new PopupWithImage (popupElements.imagePopup);
popupWithImage.setEventListeners();

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

const formEditAvatarValidation = new FormValidator (popupElements.formEditAvatarSelector, popupElements);
formEditAvatarValidation.enableValidation();
