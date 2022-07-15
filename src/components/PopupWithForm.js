import closeIcon from '../images/mesto-close-icon.svg';


function PopupWithForm ({name, title, button, disabled, isOpen, onClose, onSubmit, children}) {
    return (
        <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} >
          <form className="popup__form" name={name} onSubmit={onSubmit}>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className={`popup__save-button ${disabled && "popup__save-button_disabled"}`} disabled={disabled}>{button}</button>
            <img className="popup__close-button" src={closeIcon} alt="закрыть" onMouseDown={onClose}/>
          </form>
        </section>
    )
}

export default PopupWithForm;
