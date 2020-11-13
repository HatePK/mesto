export class UserInfo {
    constructor({userName, userDescription, userAvatar, userId}) {
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
        this._userAvatar = document.querySelector(userAvatar);
        this._userId = userId;
    }
    
    getUserInfo() {
        this._userInfo = {};
        this._userInfo['name'] = this._userName.textContent;
        this._userInfo['description'] = this._userDescription.textContent;
        this._userInfo['avatar'] = this._userAvatar.src;
        return this._userInfo;
    }

    setUserInfo(name, description, avatar, id) {
        this._userName.textContent = name;
        this._userDescription.textContent = description;
        this._userAvatar.style.backgroundImage = `url(${avatar})`
        this._userId = id;
    }

    askUserId() {
        return this._userId
    }
}