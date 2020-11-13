export class Card {
    constructor(name, link, likes, id, ownerId, userId, api, selector, openCardHandler, handleOpenConfirmPopup) {
        this._itemName = name;
        this._itemLink = link;
        this._likes = likes;
        this._id = id;
        this._ownerId = ownerId;
        this._userId = userId;
        this._api = api;
        this._selector = selector;
        this._openCardHandler = openCardHandler;
        this._handleOpenConfirmPopup = handleOpenConfirmPopup;
    }

    _getTemplate(){
        return this._selector.cloneNode(true);
    }
    

    _checkLikes(){
        if (this._likes.find(item => item._id == this._userId)) {
            this._element.querySelector('.element__like').classList.add('element__like_type_active');
        }
    }

    _setCardId(){
        this._element.id = `${this._id}`;
    }

    _likeButton(){
        if (this._likes.find(item => item._id == this._userId)) {
            this._api.deleteLike(this._id)
                .then(result => {
                    this._likes = result.likes;
                        this._element.querySelector('.element__like-conter-amount').textContent = this._likes.length;
                        this._element.querySelector('.element__like').classList.remove('element__like_type_active');
                })
            } else { 
            this._api.addLike(this._id)
            .then(result => {
                this._likes = result.likes;
                this._element.querySelector('.element__like-conter-amount').textContent = this._likes.length;
                this._element.querySelector('.element__like').classList.add('element__like_type_active');
            })
        }
    }

    _hideDelButton(){
        if (this._userId != this._ownerId) {
            this._element.querySelector('.element__delete').style.display = "none";
        }
    }

    _setListeners(){
        this._element.querySelector('.element__like').addEventListener('click', ()=>this._likeButton());
        this._element.querySelector('.element__delete').addEventListener('click', ()=>this._handleOpenConfirmPopup(this._id));
        this._itemImage.addEventListener('click', ()=>this._openCardHandler(this._itemName, this._itemLink));
    } 

    getElement(){
        this._element = this._getTemplate();
        this._itemImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__text').textContent = this._itemName;
        this._itemImage.src = this._itemLink;
        this._itemImage.alt = this._itemName;
        this._element.querySelector('.element__like-conter-amount').textContent = this._likes.length;
        this._setListeners();
        this._hideDelButton();
        this._checkLikes();
        this._setCardId();
        return this._element;
    };
};