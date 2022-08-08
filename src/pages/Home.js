import React from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from '../video/pexels-james-borastero-9322934.mp4';
import Footer from '../components/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <video id="video" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="title-container">
        <h2 className="home-title">Melody</h2>
        <Link
          to="compose"
          className="home-nav-link"
          // style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          COMPOSE
        </Link>
      </div>
      <div className="hero-section">
        <h1>A TOOL FOR MUSIC</h1>
        <p>This is a tool to write and edit music. Explore and have fun!</p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
