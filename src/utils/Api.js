const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '4c149f7f-14ac-4bbb-bba6-c93092168f3d',
    'Content-Type': 'application/json'
  }
}


class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers : {
        authorization: this._headers.authorization
      }
    })
      .then(this._checkResponse)

  }

  getInitialProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers : {
        authorization: this._headers.authorization
      }
    })
      .then(this._checkResponse)
      .then(data => {
        this.userId = data._id;
        return data;
      })

  }

  editProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers : this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)

  }

  editAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers : this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(this._checkResponse)

  }

  postCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers : this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)

  }

  deleteElement(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers : {
        authorization: this._headers.authorization
      }
    })

  }

  handleLikeClick(card) {
    let method = '';
    const likes = card.likes.map(i => i['_id']);

    if (likes.includes(this.userId)) {
      method = 'DELETE'
    } else {
      method = 'PUT'
    };

    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: method,
      headers : {
        authorization: this._headers.authorization
      }
    })
    .then(this._checkResponse)
  }

}

export const api = new Api(options);
