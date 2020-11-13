export class Api {
    constructor(config) {
        this.headers = config.headers;
        this.url = config.url
    }

    getCards() {
        return fetch(this.url, {
            headers: this.headers
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    createCard(name, link) {
        return fetch(this.url, { 
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({name, link})
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    userInfo() {
        return fetch(this.url, {
            headers: this.headers
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    setUserInfo(name, about) {
        return fetch(this.url, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({name, about})
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    deleteCard(id) {
        return fetch(`${this.url}/${id}`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({id})
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    addLike(id) {
        return fetch(`${this.url}/${id}`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({id})
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    deleteLike(id) {
        return fetch(`${this.url}/${id}`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({id})
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    editAvatar(avatar) {
        return fetch(this.url, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({avatar})
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }
}