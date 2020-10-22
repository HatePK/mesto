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

function handleDeleteClick(event) {
    event.target.closest('.element').remove();
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

// Отрисовка карточек
initialCards.forEach ((data) => {
    renderCard(data)
});