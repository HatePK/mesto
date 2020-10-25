export class Card {
    constructor(item, selector, openCardHandler) {
        this._itemName = item.name;
        this._itemLink = item.link;
        this._selector = selector;
        this._openCardHandler = openCardHandler;
    }

    _getTemplate(){
        return this._selector.cloneNode(true);
    }
    
    _likeButton(){
        this._element.querySelector('.element__like').classList.toggle('element__like_type_active');
    }

    _deleteButton(){
        this._element.remove();
    }

    _setListeners(){
        this._element.querySelector('.element__like').addEventListener('click', ()=>this._likeButton());
        this._element.querySelector('.element__delete').addEventListener('click', ()=>this._deleteButton());
        this._element.querySelector('.element__image').addEventListener('click', ()=>this._openCardHandler(this._itemName, this._itemLink));
    }

    getElement(){
        this._element = this._getTemplate();
        this._element.querySelector('.element__text').textContent = this._itemName;
        this._element.querySelector('.element__image').src = this._itemLink;
        this._element.querySelector('.element__image').alt = this._itemName;
        this._setListeners();
        return this._element;
    };
};