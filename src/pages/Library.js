import React, {
  useEffect,
  useState,
  // useCallback
} from 'react';
import {
  getSongs,
  createSong,
  // updateSong,
  deleteSong,
  toggleEditMode,
} from '../redux/actions/songs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import NoteButton from '../components/NoteButton';
import SongForm from '../components/Library/SongForm';
import axios from 'axios';
import './Library.css';

//LIBRARY RECEIVES CURRENT SONG DATA FROM COMPOSER AS PROPS
export default function Library() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [songsData, setSongsData] = useState([]);
  const [songData, setSongData] = useState([]);

  const location = useLocation();
  // console.log('library state: ', location.state);

  // const [currentSong, setCurrentSong] = useState(
  //   state.songData ? state.songData : null
  // );
  const songsStore = useSelector((state) => state.songs);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // console.log('redux songsStore:', songsStore);
  // console.log('songs in library:', songsStore.songs);
  // const [songsToDisplay, setSongsToDisplay] = useState('');
  // console.log('length: ', songsStore.songs.length);
  // AUTOMATIC GET WITH MOUNT (REPLACES getCurrentSongs)
  useEffect(() => {
    dispatch(getSongs());
    // setSongsData(songs);
    console.log('fetched @ Library songs: ', songsStore.songs);
  }, [isUpdated]);

  // useEffect(() => {
  //   if (location.state.songDataToSave !== null) {
  //     setSongData((prevState) => location.state.songDataToSave);
  //     console.log('library state: ', songData);
  //   }
  // }, []);

  const handleEditClick = (id) => {
    // setEditMode((prevState) => {
    //   return !prevState;
    // });
    // console.log('Library set var: ', testVar);
    // setTestVar((oldState) => !oldState);
    // console.log('Library set var: ', testVar);
    // setTestVar((oldState) => !oldState);
    // console.log('Library set var: ', !testVar);
    // console.log('Library: ', editMode);
    // console.log('Library start edit mode: ', songsStore.editMode);
    // dispatch(toggleEditMode());
    // console.log('Library changed edit mode: ', songsStore.editMode);
    navigate('/revise', {
      state: {
        songToEditId: id,
        // editModeIsActive: songsStore.editMode,
        // setEditMode: setEditMode,
      },
    });
  };

  // DELETE REDUX ACTION (REPLACES handleDelete)
  const handleDelete = (id) => {
    // event.preventDefault();
    dispatch(deleteSong(id));
    dispatch(getSongs());
    setIsUpdated((prevState) => !prevState);
  };

  return (
    <div className="library">
      <div className="library-title-container">
        <div className="library-title">Library</div>
      </div>

      <div className="song-items-container">
        <div
          style={{
            color: 'black',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
          }}
        >
          {songsStore.songs
            ? songsStore.songs.map((song) => {
                return (
                  <div key={song.id}>
                    <div
                      style={{
                        color: 'black',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid black',
                        borderRadius: '15px',
                        padding: '20px',
                        margin: '20px',
                        width: '300px',
                      }}
                    >
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
            : null}
        </div>
      </div>
    </div>
  );
}

// const config = {
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//   },
// };

// const getCurrentSongs = useCallback(() => {
//   dispatch(getSongs())
//     .then((response) => {
//       console.log('getSongs response: ', response);
//       setSongData(...songData, response.data);
//     })
//     .catch((error) => {
//       console.log('getSongs error: ', error);
//     });
// }, []);

// const handleDelete = (id) => {
//   axios
//     .delete(`https://mae-bookstore-backend-api.herokuapp.com/book/${id}`)
//     .delete(`http://127.0.0.1:5000/song/${id}`)
//     .then((response) => {
//       this.setState({ books: response.data });
//       console.log('handleDelete response: ', response.data);
//       setSongsData(
//         songsData.filter((song) => {
//           return song.id !== id;
//         })
//       );
//     })
//     .catch((error) => {
//       console.log('handleDelete error: ', error);
//     });
// };

// event.preventDefault();
// songs.forEach((song) => {
//   console.log(song.id);
// });
// console.log('selected id: ', id);
// console.log(
//   'handleEditClick data: ',
//   songs.filter((song) => {
//     return song.id === id;
//   })
// );
