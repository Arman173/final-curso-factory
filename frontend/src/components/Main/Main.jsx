import { useContext, useState } from 'react';
import Popup from './components/Popup/Popup';
import NewCard from './components/form/NewCard/NewCard';
import EditAvatar from './components/form/EditAvatar/EditAvatar';
import EditProfile from './components/form/EditProfile/EditProfile';
import ConfirmDeleteCard from './components/ConfirmDeleteCard/ConfirmDeleteCard';
import Card from './components/Card/Card';
import ImagePopup from './components/ImagePopup/ImagePopup';
import profile from '../../images/profile.jpg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Main(props) {
  const { popup, onOpenPopup, onClosePopup, cards, onCardLike, onCardDelete } = props;

  const { currentUser } = useContext(CurrentUserContext);
  // const [cardToDelete, setCardToDelete] = useState(null);
  let cardToDelete = null;

  const newCardPopup = { title: 'Nuevo Lugar', children: <NewCard></NewCard> };
  const editAvatarPopup = { title: 'Actualizar Avatar', children: <EditAvatar></EditAvatar> };
  const editProfilePopup = { title: 'Editar Perfil', children: <EditProfile></EditProfile> };
  const confirmDeletePopup = { title: '¿Estás seguro/a?', children: <ConfirmDeleteCard handleDeleteCard={() => onCardDelete(cardToDelete)} /> }

  function openConfirmDeleteCardPopup(card) {
    console.log(cardToDelete);
    cardToDelete = card;
    console.log(cardToDelete);
    onOpenPopup(confirmDeletePopup);
  }

  return (
      <main className="content">
        <section className="profile">
          <div
            id="profileAvatarContainer"
            className="profile__avatar-container"
            onClick={() => onOpenPopup(editAvatarPopup)}
          >
            <img
              src={currentUser.avatar || profile}
              alt="profile_photo"
              className="profile__photo"
            />
          </div>
          <div className="profile__info">
            <h1 id="profileName" className="profile__name">{currentUser.name}</h1>
            <h2 id="profileAbout" className="profile__subtitle">{currentUser.about}</h2>
            <button
              className="profile__editbtn"
              id="openPopupBtn"
              onClick={() => onOpenPopup(editProfilePopup)}
            ></button>
          </div>
          <button 
              className="profile__button"
              id="openAddBtn"
              onClick={() => onOpenPopup(newCardPopup)}
          ></button>
        </section>

        <section className="elements" id="elements">

          {cards.map((card) => (
              <Card
                  key={card._id}
                  card={card}
                  onCardLike={onCardLike}
                  onCardDelete={openConfirmDeleteCardPopup}
                  handleOpenPopup={(imageComponent) => {
                      onOpenPopup({
                          title: '',
                          children: <ImagePopup card={imageComponent} />
                      });
                  }}
              />
          ))}

          <template id="elements-card">
            <article className="elements__article">
              <img
                src="./images/photo_1.jpg"
                alt="foto uno"
                className="elements__photo"
              />
              <button className="elements__delete"></button>
              <div className="elements__title">
                <p className="elements__name">Valle de Yosemite</p>
                <button className="elements__button"></button>
              </div>
            </article>
          </template>
        </section>

        {popup && (
          <Popup
              onClose={onClosePopup}
              title={popup.title}
          >
              { popup.children }
          </Popup>
        )}
      </main>
  );
}