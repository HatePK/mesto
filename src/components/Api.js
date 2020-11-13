export class Api {
    constructor(config) {
        this.headers = config.headers;
        this.url = config.url;
        this._handleOriginalResponse = config.function;
    }

    

    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        }).then(this._handleOriginalResponse).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    createCard(name, link) {
        return fetch(`${this.url}/cards`, { 
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({name, link})
        }).then(this._handleOriginalResponse).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    userInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        }).then(this._handleOriginalResponse).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    setUserInfo(name, about) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({name, about})
        }).then(this._handleOriginalResponse).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({id})
        }).then(this._handleOriginalResponse).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    addLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({id})
        }).then(this._handleOriginalResponse).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    deleteLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({id})
        }).then(this._handleOriginalResponse).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    editAvatar(avatar) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({avatar})
        }).then(this._handleOriginalResponse).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }
}