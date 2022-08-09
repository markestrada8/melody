import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact">
        Melody | Interactive Music App |{' '}
        <a href="https://reactjs.org/">React</a> |{' '}
        <a href="https://tonejs.github.io/">Tone.js</a>
      </div>
      <div className="social-links">
        <a className="social-link" href="#">
          <BsFacebook />
        </a>
        <a className="social-link" href="#">
          <BsInstagram />
        </a>
        <a className="social-link" href="#">
          <BsTwitter />
        </a>
      </div>
      <p>© 2022 MAE Melody</p>
    </div>
  );
};

export default Footer;
