import { useState } from 'react';

import PopupWithForm from './PopupWithForm.js';
import { useFormValidation } from '../hooks/UseFormValidation.js';


function AddPlacePopup ({isOpen, onClose, onAddPlace}) {
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

  function handleSubmit (e) {
    e.preventDefault();
    setButton(loadingButton);
    onAddPlace(values)
      .finally(() => {
        setButton(defaultButton);
        resetForm();
      });
  }

  return (
      <PopupWithForm
        name="place"
        title="Новое место"
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
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={values.name || ''}
          required
          onChange={handleChange}
        />
        <span
        className={`popup__error ${ errors.name ? "popup__error_visible" : ""}`}
        >
          {errors.name}
        </span>
        <input
          className={`popup__input popup__input_type_second-row ${ errors.link ? "popup__input_type_error" : ""}`}
          id="link"
          type="url"
          placeholder="Ссылка на картинку"
          value={values.link || ''}
          required
          onChange={handleChange}
        />
        <span
          className={`popup__error ${ errors.link ? "popup__error_visible" : ""}`}
        >
          {errors.link}
        </span>
      </PopupWithForm>
  )
}

export default AddPlacePopup;
