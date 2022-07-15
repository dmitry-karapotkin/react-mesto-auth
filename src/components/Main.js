import Card from './Card.js';

import editIcon from '../images/mesto-edit-icon.svg';
import plusIcon from '../images/mesto-plus-icon.svg';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main (props) {

  const { currentUser } = useContext(CurrentUserContext);

    return (
        <main className="content">
          <section className="profile">

            <div className="profile-info">
              <img className="profile-info__photo" src={currentUser.avatar} alt="аватар" />
              <button className="profile-info__overlay" onClick={props.onEditAvatar}>
                <img className="profile-info__edit-icon profile-info__edit-icon_size_big" src={editIcon} alt="изменить аватар" />
              </button>
                <div className="profile-info__first-row">
                  <h1 className="profile-info__name">{currentUser.name}</h1>
                  <button className="profile-info__edit-button" onClick={props.onEditProfile}>
                    <img className="profile-info__edit-icon profile-info__edit-icon_size_small" src={editIcon} alt="изменить данные" />
                  </button>
                </div>
                <p className="profile-info__job">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" onClick={props.onAddPlace}>
              <img className="profile__add-icon" src={plusIcon} alt="добавить" />
            </button>

          </section>

          <section className="elements">
            {props.cards.map((item) => {

              return (
                <Card
                  card={item}
                  key={item['_id']}
                  onTrashClick={props.onCardDelete}
                  onLikeClick={props.onCardLike}
                  onCardClick={props.onCardClick}/>
                );

              })
            }
          </section>

        </main>
    )
}

export default Main;
