export const popupElements = {
    formEditProfileSelector: '.popup__container_edit-profile',
    formNewPlaceSelector: '.popup__container_new-place',
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    inputValidClass: 'popup__field_valid',
    inputErrorClass: 'popup__field_invalid',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    activeButtonClass: 'popup__submit_active',
    cardsListContainer: '.elements__list',
    imagePopup: '.popup_type_image-big',
    userName: '.profile__name',
    userDescription: '.profile__job',
    popupCloseButton: document.querySelector('.popup__close-button')
}

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];