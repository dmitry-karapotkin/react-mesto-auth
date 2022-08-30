import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import closeIcon from '../images/mesto-close-icon.svg';
import successIcon from '../images/mesto-success-icon.svg';
import errorIcon from '../images/mesto-error-icon.svg';

function InfoToolTip ({isOpen, setModalOpen, isSuccess}) {

  const history = useHistory();

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        setModalOpen(false)
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function handleClose() {
    setModalOpen(false);
    if (isSuccess) {
      history.push('/signin');
    }
  }

  return (
    <section className={`popup popup_type_modal ${isOpen ? "popup_opened" : ""}`} >
    <div className="popup__modal">
      <img className="popup__status-icon" src={isSuccess ? successIcon : errorIcon} alt={`статус ${isSuccess? "ок": "ошибка"}`} />
      <h2 className="popup__title">
        {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </h2>
      <img className="popup__close-button" src={closeIcon} alt="закрыть" onMouseDown={handleClose}/>
    </div>
  </section>
  )
}

export default InfoToolTip;
