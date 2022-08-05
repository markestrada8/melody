import React, { useEffect, useState } from 'react';
import { getSongs, deleteSong } from '../redux/actions/songs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import './Library.css';

//LIBRARY PASSES SONG ID TO COMPOSE / REVISE AS navigate.state
export default function Library() {
  // eslint-disable-next-line
  const [isUpdated, setIsUpdated] = useState(false);
  // const [songsData, setSongsData] = useState([]);
  // const [songData, setSongData] = useState([]);

  // const location = useLocation();

  const songsStore = useSelector((state) => state.songs);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongs());

    // console.log('fetched @ Library songs: ', songsStore.songs);
  }, [dispatch]);

  const handleEditClick = (id) => {
    navigate('/revise', {
      state: {
        songToEditId: id,
      },
    });
  };

  // DELETE REDUX ACTION (REPLACES handleDelete)
  // FUNCTIONS FROM REDUX ACTIONS, NOT API
  const handleDelete = (id) => {
    dispatch(deleteSong(id));
    dispatch(getSongs());
    setIsUpdated((prevState) => !prevState);
  };

  return (
    <div className="library">
      <div className="library-title-container">
        <div className="library-title">Library</div>
      </div>
      <div className="create-button-container">
        <button className="create-button">New</button>
      </div>

      <div className="song-items-container">
        {songsStore.songs ? (
          songsStore.songs.map((song) => {
            return (
              <div key={song.id}>
                <div className="song-item" style={{}}>
                  <h3>{song.title}</h3>
                  <p>{song.description}</p>
                  <button
                    className="button"
                    onClick={() => handleEditClick(song.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button"
                    onClick={(event) => handleDelete(song.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}
