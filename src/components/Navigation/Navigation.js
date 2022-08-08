import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { GiMusicSpell } from 'react-icons/gi';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
  let activeStyle = {
    borderBottom: '3px solid #ffffff',
  };

  // let activeClassName = 'underline';
  return (
    <div className="navbar">
      <div className="navbar-container container">
        <div className="title">
          <GiMusicSpell className="music-icon" />
          <h1>Melody</h1>
        </div>
        <div className="nav-links">
          <NavLink
            to="/"
            className="nav-link"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="compose"
            className="nav-link"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Composer
          </NavLink>

          <NavLink
            to="library"
            className="nav-link"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Library
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
