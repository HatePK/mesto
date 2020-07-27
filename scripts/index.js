const AddPlacePopup = document.querySelector('.popup_type_new-place');
const EditProfilePopup = document.querySelector('.popup_type_edit-profile');
const ImagePopup = document.querySelector('.popup_type_image-big');

const form = document.querySelector('.popup');

const formEditButton = document.querySelector('.profile__edit-button');
const AddPlaceButton = document.querySelector('.profile__add-button');
const AddPlaceCloseButton = AddPlacePopup.querySelector('.popup__close-button');
const EditProfileCloseButton = EditProfilePopup.querySelector('.popup__close-button');
const ImagePopupImg = ImagePopup.querySelector('.popup__image');
const ImagePopupTitle = ImagePopup.querySelector('.popup__image-title');
const BigImageCloseButton = ImagePopup.querySelector('.popup__close-button');

let EditFormSubmitButton = EditProfilePopup.querySelector('.popup__submit');
let AddPlaceFormSubmitButton = AddPlacePopup.querySelector('.popup__submit');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let nameInput = EditProfilePopup.querySelector('.popup__field_type_name');
let jobInput = EditProfilePopup.querySelector('.popup__field_type_job');
let placeInput = AddPlacePopup.querySelector('.popup__field_type_place-name');
let urlImageInput = AddPlacePopup.querySelector('.popup__field_type_place-url');
 

nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent



const formToggle = function (popupModal) {
    popupModal.classList.toggle('popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    EditProfilePopup.classList.remove('popup_opened');
}
EditFormSubmitButton.addEventListener('click', formSubmitHandler);


function AddPlaceformSubmitHandler (evt) {
    evt.preventDefault();
    renderCard({name: placeInput.value, link: urlImageInput.value})
    AddPlacePopup.classList.remove('popup_opened');
}
AddPlaceFormSubmitButton.addEventListener('click', AddPlaceformSubmitHandler);


formEditButton.addEventListener('click', () => {
    formToggle(EditProfilePopup);
});
EditProfileCloseButton.addEventListener('click', () => {
    formToggle(EditProfilePopup);
});
AddPlaceButton.addEventListener('click', () => {
    formToggle(AddPlacePopup);
})
AddPlaceCloseButton.addEventListener('click', () => {
    formToggle(AddPlacePopup);
});
BigImageCloseButton.addEventListener('click', () => {
    formToggle(ImagePopup);
});


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

const ElementTemplate = document.querySelector('.template-element').content.querySelector('.element'); 
const List = document.querySelector('.elements__list');

function handleDeleteClick() {
    event.target.closest('.element').remove();
}

function createCard (data) {
    const cardElement = ElementTemplate.cloneNode(true);
    const ElementTitle = cardElement.querySelector('.element__text');
    const ElementImage = cardElement.querySelector('.element__image');
    const ElementLikeButton = cardElement.querySelector('.element__like');
    const ElementDeleteButton = cardElement.querySelector('.element__delete');

    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_type_active');
      })

    ElementLikeButton.addEventListener('click', () => {

    })

    ElementDeleteButton.addEventListener('click', () => {
        handleDeleteClick();
    })

    ElementImage.addEventListener('click', () => {
        ImagePopupImg.src = data.link;
        ImagePopupImg.alt = data.name;
        ImagePopupTitle.textContent = data.name;
        formToggle(ImagePopup);
    })

    ElementTitle.textContent = data.name;
    ElementImage.src = data.link;
    ElementImage.alt = data.name;

    return cardElement;

    
}

function renderCard(data) {
    List.prepend(createCard (data));
}

initialCards.forEach ((data) => {
    renderCard(data)
}
);

