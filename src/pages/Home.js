import React from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from '../video/pexels-james-borastero-9322934.mp4';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <video id="video" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="title-container">
        <h1 className="home-title">Melody</h1>
        <Link
          to="compose"
          className="home-nav-link"
          // style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          COMPOSE
        </Link>
      </div>
    </div>
  );
};

export default Home;
