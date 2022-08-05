import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Navigation from '../src/pages/Navigation';
import Composer from '../src/pages/Composer';
import SongForm from './pages/Library';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="composer" element={<Composer />} />
        <Route path="library" element={<SongForm />} />
        {/* <Route path="auth" element={<SignIn />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
