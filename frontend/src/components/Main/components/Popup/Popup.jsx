export default function Popup(props) {
    // los children son el contenido de la ventana emergente
    const { onClose, title, children } = props;

    return (
        <div className="popup">
          <div className="popup__overlay" onClick={onClose}></div>
          <div className={`${
                !title ? "popup__container" : "popup__content"
              }`}
          >
            <button
                aria-label="Close modal"
                className="popup__close popup__closebtn"
                type="button"
                onClick={onClose}
            />
            {title && <h3 className="popup__title">{ title }</h3>}
            { children }
          </div>
        </div>
    );
}