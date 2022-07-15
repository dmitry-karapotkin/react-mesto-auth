import closeIcon from '../images/mesto-close-icon.svg';


function ImagePopup ({card, isOpen, onClose}) {
    return (
        <section className={`popup popup_type_element ${isOpen && 'popup_opened'}`}>
          <figure className="popup__element">
            <img className="popup__image" src={card.link} alt={card.name} />
            <img className="popup__close-button" src={closeIcon} alt="закрыть" onMouseDown={onClose} />
            <figcaption className="popup__caption">{card.name}</figcaption>
          </figure>
        </section>
    );
}

export default ImagePopup;
