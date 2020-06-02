'use strict';

class Api {
    constructor(options) {
      this.options = options;
    }
  

    getInitialUserInformation() {
        return fetch(`${this.options.baseUrl}/users/me`, {...this.options})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => Promise.reject(`Ошибка: ${err.message}`));
    }
    
    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, { ...this.options })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => Promise.reject(`Ошибка: ${err.message}`));
    }


    toEditProfile(name, about) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({                
                name:  name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => Promise.reject(`Ошибка: ${err.message}`));
    }
}

        
export const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort10',
    headers: {
        authorization: '686c2dab-15b3-4cc3-ab32-35d23d057880',
        'Content-Type': 'application/json'
    }
});