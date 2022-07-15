import { useState, useContext, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useFormValidation } from '../hooks/UseFormValidation.js';


function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {

    const { currentUser } = useContext(CurrentUserContext);

    const defaultButton = 'Сохранить';
    const loadingButton = 'Сохранение...';
    const [button, setButton] = useState(defaultButton);

    const {
      values,
      setValues,
      errors,
      isValid,
      setIsValid,
      handleChange
    } = useFormValidation();

    useEffect(() => {
      setValues(currentUser);
      setIsValid(false);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
      e.preventDefault();
      setButton(loadingButton);
      onUpdateUser(values)
        .finally(() => setButton(defaultButton));
    };

    return (
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          button={button}
          disabled={!isValid}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            className={`popup__input popup__input_type_first-row ${ errors.name ? "popup__input_type_error" : ""}`}
            id="name"
            type="text"
            minLength="2"
            maxLength="40"
            required
            value={values.name || ''}
            onChange={handleChange}
          />
          <span className={`popup__error ${ errors.name ? "popup__error_visible": ""}`}>
            {errors.name}
          </span>
          <input
            className={`popup__input popup__input_type_second-row ${ errors.about ? "popup__input_type_error" : ""}`}
            id="about"
            type="text"
            minLength="2"
            maxLength="200"
            required
            value={values.about || ''}
            onChange={handleChange}
          />
          <span className={`popup__error ${ errors.about ? "popup__error_visible" : ""}`}>
            {errors.about}
          </span>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
