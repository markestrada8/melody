import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSong } from '../../API/api';
import { createSong, getSongs } from '../../redux/actions/songs';
import { TextField } from '@material-ui/core';
import './SongForm.css';

const SongForm = ({ title, setTitle, description, setDescription }) => {
  // const [songData, setSongData] = useState([]);
  // const songs = useSelector((state) => state.songs);

  // const dispatch = useDispatch();

  // console.log('form data: ', title, description);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .post(
  //       'http://127.0.0.1:5000/song/add',
  //       {
  //         title: title,
  //         description: description,
  //       },
  //       config
  //     )
  //     .then((response) => {
  //       console.log('Post Success: ', response);
  //       setSongsData((prevState) => [
  //         ...prevState,
  //         { title: title, description: description },
  //       ]);
  //     })
  //     .catch((error) => {
  //       console.log('Post Error: ', error);
  //     });
  // };

  // REPLACES HANDLE SUBMIT WITH REDUX ACTION / API (REPLACES handleSubmit)

  return (
    <div className="form-group">
      <h2>Enter Song Information</h2>
      {/* {songData && (
src/pages/Compose.js          <div className="song-summary">
            {songData.map((column, columnIndex) => (
              <div className="note-column" key={columnIndex + 'column'}>
                {column.map(({ note, isActive }, noteIndex) => (
                  <NoteButton
                    note={note}
                    isActive={isActive}
                    key={note + columnIndex}
                  />
                ))}
              </div>
            ))}
          </div>
        )} */}
      <div className="inputs-container">
        <TextField
          id="standard-basic"
          className="add-song-input"
          onChange={(event) => setTitle(event.target.value)}
          // name="creator"
          // variant="outlined"
          label="Title"
          // width="75"

          value={title}
          placeholder="Title"
        />

        <TextField
          id="standard-basic"
          className="add-song-textarea"
          onChange={(event) => setDescription(event.target.value)}
          // name="creator"
          // variant="outlined"
          label="Description"
          // width="75"
          value={description}
          name="description"
          placeholder="Description"
        />
      </div>
    </div>
  );
};

export default SongForm;
