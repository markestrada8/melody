import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSong } from '../redux/actions/songs';
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
  // console.log(
  //   'REVISE location title: ',
  //   songs.filter((song) => song.id === location.state.songToEditId)[0].title
  // );

  const handleUpdate = () => {
    const songData = {
      id: location.state.songToEditId,
      title: title,
      description: description,
      song: songGrid,
    };
    dispatch(updateSong(location.state.songToEditId, songData));
    navigate('/library');
  };

  return (
    <div className="reviser">
      <div
        className="reviser-form"
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
        <button className="submit-button" type="submit" onClick={handleUpdate}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Revise;
