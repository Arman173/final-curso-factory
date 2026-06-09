import { useContext, useRef } from 'react';
import { CurrentUserContext } from '../../../../../contexts/CurrentUserContext';

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  // creamos la referencia
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }
  return (
    <form id="avatarForm" className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Link de la imagen"
        className="popup__input popup__input-name"
        name="avatar"
        minLength="2"
        id="inputAvatar"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error popup__input--error-web" id="inputAvatar-error">
        Por favor, introduce una página web válida
      </span>
      
      <button className="popup__button" type="submit" id="inputAvatarButton">
        Guardar
      </button>
    </form>
  );
}