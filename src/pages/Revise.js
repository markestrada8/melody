import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSong } from '../API/api';
import Editor from '../components/Edit/Editor';
import SongForm from '../components/Library/SongForm';
import './Revise.css';

const Revise = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const songs = useSelector((state) => state.songs.songs);
  const [title, setTitle] = useState(
    songs.filter((song) => song.id === location.state.songToEditId)[0].title
  );
  const [description, setDescription] = useState(
    songs.filter((song) => song.id === location.state.songToEditId)[0]
      .description
  );
  const [songGrid, setSongGrid] = useState(
    songs.filter((song) => song.id === location.state.songToEditId)[0].song
  );
  // console.log('REVISE songGrid: ', songGrid);
  console.log(
    'REVISE location title: ',
    songs.filter((song) => song.id === location.state.songToEditId)[0].title
  );

  const handleUpdate = (id, songDataToUpdate) => {
    const songData = {
      id: id,
      title: title,
      description: description,
      song: songDataToUpdate,
    };
    dispatch(updateSong(id, songData));
    navigate('/library');
  };

  return (
    <div className="reviser">
      <form
        className="composer-form"
        onSubmit={() => handleUpdate(location.state.songToEditId, songGrid)}
      >
        <div className="reviser-title">Revise</div>
        <SongForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
        <Editor songGrid={songGrid} setSongGrid={setSongGrid} />
        <button className="submit-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Revise;
