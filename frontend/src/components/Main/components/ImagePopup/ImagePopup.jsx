export default function ImagePopup(props) {
    const { name, link } = props.card;

    return (
        <>
            <img
                src={link}
                alt={`Foto de ${name}`}
                className="popup__image"
            />
            <p className="popup__name">{name}</p>
        </>
    );
}