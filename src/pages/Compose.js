import { useState } from 'react';
import { generateGrid } from '../functions/functions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createSong } from '../redux/actions/songs';
import SongForm from '../components/Library/SongForm';
import Editor from '../components/Edit/Editor';
import './Compose.css';

const Compose = () => {
  const [songGrid, setSongGrid] = useState(generateGrid());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSave = (event) => {
    event.preventDefault();
    const newSong = {
      title: title,
      description: description,
      song: songGrid,
    };
    dispatch(createSong(newSong));
    // setDescription('');
    // setTitle('');
    navigate('/library');
    // dispatch(getSongs());
    // songDataToSave = null;
  };

  return (
    <div className="composer">
      <div className="composer-title-container">
        <div className="composer-title">Compose</div>
      </div>
      <div className="composer-form">
        <SongForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
        <Editor songGrid={songGrid} setSongGrid={setSongGrid} />
        <button className="submit-button" type="submit" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Compose;
