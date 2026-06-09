import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function NewCard() {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleLinkChange(event) {
        setLink(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        handleAddPlaceSubmit({ name, link });
    }
    return (
        <form
            className="popup__form"
            name="card-form"
            id="new-card-form"
            noValidate
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    className="popup__input popup__input-name"
                    id="card-name"
                    maxLength="30"
                    minLength="1"
                    name="card-name"
                    placeholder="Title"
                    required
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                />
            </label>
            <label className="popup__field">
                <input
                    className="popup__input popup__input-about"
                    id="card-link"
                    name="link"
                    placeholder="Image link"
                    required
                    type="url"
                    value={link}
                    onChange={handleLinkChange}
                />
            </label>

            <button className="button popup__button" type="submit">Guardar</button>
        </form>
    );
}