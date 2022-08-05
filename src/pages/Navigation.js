import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  let activeStyle = {
    borderBottom: '3px solid black',
  };

  // let activeClassName = 'underline';
  return (
    <div className="navbar">
      <div className="navigation-container">
        <div className="title">
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
            to="composer"
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
