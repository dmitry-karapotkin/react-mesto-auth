import { useEffect, useState } from 'react';

import PopupWithForm from './PopupWithForm.js';
import { useFormValidation } from '../hooks/UseFormValidation.js';


function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

    const defaultButton = 'Сохранить';
    const loadingButton = 'Сохранение...';
    const [button, setButton] = useState(defaultButton);

    const {
      values,
      errors,
      isValid,
      handleChange,
      resetForm
    } = useFormValidation();

    useEffect(() => {
      resetForm();
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        setButton(loadingButton);
        onUpdateAvatar(values.avatar)
          .finally(() => {
            setButton(defaultButton);
            resetForm();
          });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            button={button}
            disabled={!isValid}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
          <input
            className={`popup__input popup__input_type_first-row ${ errors.avatar ? "popup__input_type_error" : ""}`}
            id="avatar"
            type="url"
            placeholder="Ссылка на новый аватар"
            value={values.avatar || ''}
            required
            onChange={handleChange}
          />
          <span
            className={`popup__error ${ errors.avatar ? "popup__error_visible" : ""}`}
          >
            {errors.avatar}
          </span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
