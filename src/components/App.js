import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/Auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';


function App() {
  const emptyCard = {name: '', link: '#'};
  const emptyUser = {};

  const [loggedIn, setLoggedIn] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState(emptyUser);
  const [currentUser, setCurrentUser] = useState(emptyUser);
  const history = useHistory();

  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(emptyCard);

  useEffect(() => {
    api.getInitialProfileInfo()
    .then(data => {
      setCurrentUser(data);
    })
    .catch(err => console.log(err));
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.log(err));
    checkToken();
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      auth.getContent(localStorage.getItem('jwt'))
        .then(data => {
          setAuthorizedUser(data.data.email);
          setLoggedIn(true);
          history.push('/');
        })
    }
  }

  function handleEditAvatarClick () {
    setAvatarPopupOpen(true);
  }

  function handleUpdateAvatar (url) {
    return api.editAvatar(url)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleEditProfileClick () {
    setProfilePopupOpen(true);
  }

  function handleUpdateUser (data) {
    return api.editProfile(data)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceClick () {
    setPlacePopupOpen(true);
  }

  function handleAddPlace (data) {
    return api.postCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardLike(card) {
    api.handleLikeClick(card)
      .then(
        (newCard) => {
          setCards((state) => state.map(c => c._id === newCard._id ? newCard : c))
        }
      )
      .catch(err => console.log(err));
  }

  function handleDeleteClick(card) {
    setSelectedCard(card);
    setDeleteCardPopupOpen(true);
  }

  function handleConfirmDeleteCard(e) {
    e.preventDefault();
    const cardId = selectedCard['_id'];

    api.deleteElement(cardId)
      .then(() => {
        setCards(cards.filter(item => item['_id'] !== cardId));
        setSelectedCard(emptyCard);
        closeAllPopups();
      })
      .catch(err => console.log(err));

  }

  function closeAllPopups () {
    setAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setImagePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(emptyCard);
  }

  return (
      <CurrentUserContext.Provider value={{
        currentUser,
        authorizedUser,
        loggedIn,
        setLoggedIn,
        handleLogin: checkToken
      }}>
        <div className="page">

          <Header />

          <Switch>

            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
                onClosePopup={closeAllPopups}
                cards={cards}
              />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlace}
              />

              <PopupWithForm
                name="delete"
                title="Вы уверены"
                button="Да"
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                onSubmit={handleConfirmDeleteCard}
              />

              <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
              />
            </ProtectedRoute>

            <Route path="/signup">
              <Register />
            </Route>

            <Route path="/signin">
              <Login />
            </Route>

          </Switch>

          <Footer />

        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
