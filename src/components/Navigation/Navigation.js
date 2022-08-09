import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { GiMusicSpell } from 'react-icons/gi';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
  const [menuActive, setMenuActive] = useState(false);

  let activeStyle = {
    borderBottom: '3px solid #ffffff',
  };

  const handleButtonClick = () => {
    setMenuActive(!menuActive);
  };

  const handleLinkClick = () => {
    setMenuActive(false);
  };

  // let activeClassName = 'underline';
  return (
    <div className="navbar">
      <div className="navbar-container container">
        <div className="title">
          <GiMusicSpell className="music-icon" />
          <h1>Melody</h1>
        </div>
        <div className="menu-icon" onClick={handleButtonClick}>
          {menuActive ? (
            <FaTimes className="fa-times" />
          ) : (
            <FaBars className="fa-bars" />
          )}
        </div>
        <ul className={menuActive ? 'nav-menu active' : 'nav-menu'}>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={handleLinkClick}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="compose"
              className="nav-link"
              onClick={handleLinkClick}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Composer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="library"
              className="nav-link"
              onClick={handleLinkClick}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Library
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
