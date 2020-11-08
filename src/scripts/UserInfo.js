export class UserInfo {
    constructor({userName, userDescription}) {
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
    }
    
    getUserInfo() {
        this._userInfo = {};
        this._userInfo['name'] = this._userName.textContent;
        this._userInfo['description'] = this._userDescription.textContent;
        return this._userInfo;
    }

    setUserInfo(name, description) {
        this._userName.textContent = name;
        this._userDescription.textContent = description;
    }
}