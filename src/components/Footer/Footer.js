import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div class="contact">
        Melody | Interactive Music App |{' '}
        <a href="https://reactjs.org/">React</a> |{' '}
        <a href="https://tonejs.github.io/">Tone.js</a>
      </div>
      <div class="social-links">
        <a class="social-link" href="#">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a class="social-link" href="#">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a class="social-link" href="#">
          <i class="fa-brands fa-twitter"></i>
        </a>
      </div>
      <p>© 2022 Mark Estrada</p>
    </div>
  );
};

export default Footer;
