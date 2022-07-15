import trashIcon from '../images/mesto-trash-icon.svg';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Card ({card, onTrashClick, onCardClick, onLikeClick}) {

  const { currentUser } = useContext(CurrentUserContext);
  const isOwner = currentUser['_id'] === card['owner']['_id'];
  const isLiked = card.likes.some(item => item['_id'] === currentUser['_id']);
  const cardLikeButtonClassName = 'element__like-button_active';

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onLikeClick(card);
  }

  function handleDeleteClick() {
    onTrashClick(card);
  }

  return (
    <figure className="elements__item element" id={card['_id']} >
      <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick}/>
      { isOwner && <img className="element__trash-button" src={trashIcon} alt="удалить" onClick={handleDeleteClick} />}
      <figcaption className="element__caption">
        <p className="element__caption-text">{card.name}</p>
        <div className="element__like">
          <button
            className={`element__like-button ${isLiked ? cardLikeButtonClassName: ''}`}
            onClick={handleLikeClick}
          >
          </button>
          <p className="element__like-number">{card.likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;
