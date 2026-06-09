import { useContext } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext'

export default function Card(props) {
    const { handleOpenPopup, card, onCardLike, onCardDelete } = props;
    const { name, link, isLiked, likes } = card;
    
    const { currentUser } = useContext(CurrentUserContext);

    const cardLikeButtonClassName = `elements__button ${likes.includes(currentUser._id) ? 'elements__button-liked' : ''}`;
    
    function handleClick() {
        const imageComponent = { name, link };
        handleOpenPopup(imageComponent);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="elements__article">
            <img
                src={link}
                alt={name}
                className="elements__photo"
                onClick={handleClick}
            />
            <button className="elements__delete" onClick={handleDeleteClick}></button>
            <div className="elements__title">
                <p className="elements__name">{name}</p>
                <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            </div>
        </article>
    );
}