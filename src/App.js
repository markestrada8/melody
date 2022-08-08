import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Navigation from '../src/components//Navigation/Navigation';
import Compose from '../src/pages/Compose';
import Revise from '../src/pages/Revise';
import Library from './pages/Library';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Navigation />}>
          <Route index={true} element={<Home />} />
          <Route path="compose" element={<Compose />} />
          <Route path="revise" element={<Revise />} />
          <Route path="library" element={<Library />} />
          {/* <Route path="auth" element={<SignIn />} /> */}
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
