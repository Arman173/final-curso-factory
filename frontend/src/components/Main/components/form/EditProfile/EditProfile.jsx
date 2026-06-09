import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name || '');
  const [about, setAbout] = useState(currentUser.about || '');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAboutChange(event) {
    setAbout(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleUpdateUser({ name, about });
  }
  
  return (
    <form
      id="form"
      className="popup__form"
      name="profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Nombre"
        className="popup__input popup__input-name"
        name="name"
        minLength="2"
        maxLength="40"
        id="inputProfile"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error popup__input--error-one" id="inputProfile-error">
        Por favor, rellena este campo
      </span>
      
      <input
        type="text"
        placeholder="Acerca de mí"
        className="popup__input popup__input-about"
        name="about"
        minLength="2"
        maxLength="200"
        id="inputAbout"
        required
        value={about}
        onChange={handleAboutChange}
      />
      <span className="popup__input-error popup__input--error-two" id="inputAbout-error">
        Por favor, rellena este campo
      </span>
      
      <button className="popup__button" type="submit" id="inputProfileButton">
        Guardar
      </button>
    </form>
  );
}