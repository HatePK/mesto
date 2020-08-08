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

const initialCards = [
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

function handleDeleteClick(event) {
    event.target.closest('.element').remove();
}

function createCard (data) {
    const cardElement = elementTemplate.cloneNode(true);
    const elementTitle = cardElement.querySelector('.element__text');
    const elementImage = cardElement.querySelector('.element__image');
    const elementLikeButton = cardElement.querySelector('.element__like');
    const elementDeleteButton = cardElement.querySelector('.element__delete');

    elementLikeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_type_active');
      })

    elementDeleteButton.addEventListener('click', (event) => {
        handleDeleteClick(event);
    })

    elementImage.addEventListener('click', () => {
        imagePopupImg.src = data.link;
        imagePopupImg.alt = data.name;
        ImagePopupTitle.textContent = data.name;
        togglePopup(imagePopup);
        document.addEventListener('keydown', AddEscPopup);
    })

    elementTitle.textContent = data.name;
    elementImage.src = data.link;
    elementImage.alt = data.name;

    return cardElement;
}

function renderCard(data) {
    cardsList.prepend(createCard (data));
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(editProfilePopup);
}

function addPlaceformSubmitHandler (evt) {
    evt.preventDefault();
    renderCard({name: placeInput.value, link: urlImageInput.value})
    togglePopup(addPlacePopup);
    placeInput.value = null
    urlImageInput.value = null
    addPlaceFormSubmitButton.classList.remove('popup__submit_active');
    addPlaceFormSubmitButton.classList.add('popup__submit_disabled');
    addPlaceFormSubmitButton.disabled = true;
}

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

editFormSubmitButton.addEventListener('click', formSubmitHandler);
editProfileCloseButton.addEventListener('click', () => {
    EscapePopup(editProfilePopup);
});

overlayEditCard.addEventListener('click', () => {
    EscapePopup(editProfilePopup);
});

// Отрисовка карточек
initialCards.forEach ((data) => {
    renderCard(data)
});

// Работа с попапом добавления карточки
addPlaceButton.addEventListener('click', () => {
    togglePopup(addPlacePopup);
    document.addEventListener('keydown', AddEscPopup);
})
addPlaceFormSubmitButton.addEventListener('click', addPlaceformSubmitHandler);
addPlaceCloseButton.addEventListener('click', () => {
    togglePopup(addPlacePopup);
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




