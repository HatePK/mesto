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
const handleOriginalResponse = (result) => {
    if (!result.ok) {
        return Promise.reject('Server error');
    }
        return result.json();
}
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {'Content-Type' : 'application/json', 'authorization': 'a985b89f-2e7b-4084-9df7-0663efbc7c3b'},
    function: handleOriginalResponse
})

// Отрисовка карточек и UserInfo

Promise.all([
    api.userInfo(),
    api.getCards(),
  ])
    .then(([userData, initialCards]) => {
        userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);
        const rendererCards = new Section ({
            items: initialCards,
            renderer: (item) => {
                const cardItem = new Card(
                    item.name,
                    item.link,
                    item.likes, 
                    item._id, 
                    item.owner._id, 
                    userInfo._userId, 
                    api,
                    elementTemplate, 
                    handleOpenPopup,
                    handleOpenConfirmPopup);
                const element = cardItem.getElement();
                rendererCards.addItem(element);
            }
            }, popupElements.cardsListContainer)
        
        rendererCards.renderItems();
    })
    .catch((err) => {
        console.log(err);
    }); 

// Попап редактирования профиля

const popupWithEditForm = new PopupWithForm ({
    popupSelector: '.popup_type_edit-profile',
    formSubmit: (item) => {
        popupWithEditForm.renderLoading(true);
        api.setUserInfo(item["name-input"], item["job-input"]).then((data) => {
            userInfo.setUserInfo(data.name, data.about, data.avatar);
            popupWithEditForm.renderLoading(false);
            formEditProfileValidation.disableSubmitButton();
            popupWithEditForm.close();
        })
        .catch(() => {
            popupWithEditForm.renderLoading(false);
            popupWithEditForm.close();
        });
    },
    submitText: 'Сохранить'
});

formEditButton.addEventListener('click', () => {
    popupWithEditForm.open()
    const userActualInfo = userInfo.getUserInfo();
    nameInput.value = userActualInfo['name'];
    jobInput.value = userActualInfo['description'];
})

popupWithEditForm.setEventListeners();

// Попап изменения аватарки

const popupWithEditAvatarForm = new PopupWithForm ({
    popupSelector: '.popup_type_edit-avatar',
    formSubmit: (item) => {
        popupWithEditAvatarForm.renderLoading(true);
        api.editAvatar(item["avatar-url"]).then((data) => {
            userInfo.setUserInfo(data.name, data.about, data.avatar);
            popupWithEditAvatarForm.renderLoading(false);
            formEditAvatarValidation.disableSubmitButton();
            popupWithEditAvatarForm.close()
        })
        .catch(() => {
            popupWithEditAvatarForm.renderLoading(false);
            popupWithEditAvatarForm.close()
        });
    },
    submitText: 'Сохранить'
});

editAvatarButton.addEventListener('click', () => {
    popupWithEditAvatarForm.open()
})
popupWithEditAvatarForm.setEventListeners();

// Попап подтверждения удаления

const popupWithConfirmForm = new PopupConfirmForm ({
    popupSelector: '.popup_type_confirm',
    formSubmit: () => {
        popupWithConfirmForm.renderLoading(true);
        api.deleteCard(popupWithConfirmForm.cardId)
        .then(result => {
            document.getElementById(popupWithConfirmForm.cardId).remove();
            popupWithConfirmForm.renderLoading(false);
            popupWithConfirmForm.close();
        })
        .catch(() => {
            popupWithConfirmForm.renderLoading(false);
            popupWithConfirmForm.close();
        });
        
    },
    submitText: 'Да'
});

const handleOpenConfirmPopup = (cardId) => { popupWithConfirmForm.cardId = cardId; popupWithConfirmForm.open();}
popupWithConfirmForm.setEventListeners();

// Папап добавления карточки

const popupWithNewPlaceForm = new PopupWithForm ({
    popupSelector: '.popup_type_new-place',
    formSubmit: (inputsValue) => {
        popupWithNewPlaceForm.renderLoading(true);
        api.createCard(inputsValue["place-input"], inputsValue["url-input"]).then((item) => {
            const card = new Card(
                item.name,
                item.link, 
                item.likes, 
                item._id, 
                item.owner._id, 
                userInfo._userId, 
                api,
                elementTemplate, 
                handleOpenPopup,
                handleOpenConfirmPopup);
            const element = card.getElement();
            document.querySelector(popupElements.cardsListContainer).prepend(element);
            formNewPlaceValidation.disableSubmitButton();
            popupWithNewPlaceForm.renderLoading(false);
            popupWithNewPlaceForm.close();
        })
        .catch(() => {
            popupWithNewPlaceForm.renderLoading(false);
            popupWithNewPlaceForm.close();
        });
    },
    submitText: 'Создать'
});

addPlaceButton.addEventListener('click', () => {
    popupWithNewPlaceForm.open();
})
popupWithNewPlaceForm.setEventListeners();

// Попап с картинкой

const popupWithImage = new PopupWithImage (popupElements.imagePopup);
popupWithImage.setEventListeners();

// валидация
const formEditProfileValidation = new FormValidator (popupElements.formEditProfileSelector, popupElements);
formEditProfileValidation.enableValidation();

const formNewPlaceValidation = new FormValidator (popupElements.formNewPlaceSelector, popupElements);
formNewPlaceValidation.enableValidation();

const formEditAvatarValidation = new FormValidator (popupElements.formEditAvatarSelector, popupElements);
formEditAvatarValidation.enableValidation();
