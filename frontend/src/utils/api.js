class Api {
    constructor(options) {
        const { baseUrl } = options;
        this._baseUrl = baseUrl;
    }

    _getHeaders() {
        const token = localStorage.getItem('jwt');
        return {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        };
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            headers: this._getHeaders()
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }

    addCard({ name, link }) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({ name, link })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }

    likeCard(cardId, like = true) {
        const method = like ? 'PUT' : 'DELETE';
        return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
            method: method,
            headers: this._getHeaders()
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}users/me`, {
            headers: this._getHeaders()
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }

    updateUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({ name, about })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }

    updateProfilePicture(avatar) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({ avatar })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }
}

export const api = new Api({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/`
});