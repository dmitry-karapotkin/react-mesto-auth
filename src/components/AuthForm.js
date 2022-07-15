import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function AuthForm ({action, title, button, isRegistered}) {

  const { handleLogin, setModalOpen, setModalSuccess } = useContext(CurrentUserContext);

  const history = useHistory();

  const [values, setValues] = useState({});

  function handleChange(e) {
    const {id: name, value} = e.target;
    setValues({...values, [name] : value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    action(values)
      .then(data => {
        if (data.token) {
          setValues({email: '', password: ''});
          localStorage.setItem('jwt', data.token);
          handleLogin();
          history.push('/');
        } else if (data.data._id && data.data.email) {
          setModalSuccess(true);
          setModalOpen(true);
        } else {
          return;
        }
      })
      .catch(error => {
        console.log(error);
        setModalSuccess(false);
        setModalOpen(true);
      });
  }

  return (
    <>
      <section className="auth">
        <h2 className="auth__title">{title}</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__element-group">
            <input
              className="auth__input"
              placeholder="Email"
              id="email"
              type="email"
              minLength="2"
              maxLength="50"
              required
              value={values.email || ''}
              onChange={handleChange}
            />
            <input
              className="auth__input"
              placeholder="Password"
              id="password"
              type="password"
              minLength="2"
              maxLength="40"
              required
              value={values.password || ''}
              onChange={handleChange}
            />
          </div>
          <div className="auth__element-group">
            <button className="auth__button">{button}</button>
            <Link
              to="./signin"
              className={`auth__register-link ${isRegistered ? "auth__register-link_type_hidden" : ""}`}
            >
              Уже зарегистрированы? Войти
            </Link>
          </div>
        </form>
      </section>
    </>
  )
}

export default AuthForm;
