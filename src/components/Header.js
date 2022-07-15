import { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';

import logo from '../images/mesto-logo.svg';
import menuIcon from '../images/mesto-menu-icon.svg';
import closeIcon from '../images/mesto-close-icon.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Header () {

  const linkDict = {
    '/signin': ['Регистрация', '/signup'],
    '/signup': ['Войти', '/signin'],
    '/': ['Выйти', '/signin']
  }

  const { loggedIn, setLoggedIn, authorizedUser } = useContext(CurrentUserContext);

  const location = useLocation();
  const [link, setLink] = useState({link: linkDict[location.pathname][1], text: linkDict[location.pathname][0]});
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setLink(
      {
        link: linkDict[location.pathname][1],
        text: linkDict[location.pathname][0]
      }
    )
  }, [location]);

  function handleLinkClick () {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      setMenuVisible(false);
      setLoggedIn(false);
    }
  }

  function handleMenuClick() {
    setMenuVisible(!isMenuVisible);
  }

  return (
      <header className={`header ${isMenuVisible ? "header_type_slidedown" : ""}`}>
        <nav className="header__navbar header__navbar_orient_portrait">
          <p className="header__navlink">{loggedIn ? authorizedUser: ''}</p>
          <Link
            to={link.link}
            className={`header__navlink ${loggedIn ? "header__navlink_type_logout" : ""}`}
            onClick={handleLinkClick}
          >
            {link.text}
          </Link>
        </nav>
        <div className="header__topbar">
          <img className="header__logo" src={logo} alt="лого в шапке" />
          <nav className={`header__navbar header__navbar_orient_landscape ${loggedIn ? "header__navbar_type_hidden" : ""}`}>
            <p className="header__navlink">{loggedIn ? authorizedUser: ''}</p>
            <Link
              to={link.link}
              className={`header__navlink ${loggedIn ? "header__navlink_type_logout" : ""}`}
              onClick={handleLinkClick}
            >
              {link.text}
            </Link>
          </nav>
          {loggedIn ?
              <img
              className="header__menu-icon"
              src={ isMenuVisible ? closeIcon : menuIcon}
              alt="значок меню"
              onClick={handleMenuClick}
              /> :
              ''
            }
        </div>
      </header>
  )
}

export default Header;
