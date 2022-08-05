import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSong } from '../../API/api';
import { createSong, getSongs } from '../../redux/actions/songs';
import './SongForm.css';

const SongForm = ({ songDataToSave, editMode, setEditMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [songData, setSongData] = useState([]);
  const songs = useSelector((state) => state.songs);

  const dispatch = useDispatch();

  console.log('form data: ', songDataToSave, editMode);

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
  const handleSave = (event) => {
    event.preventDefault();
    const newSong = {
      title: title,
      description: description,
      song: songDataToSave,
    };
    dispatch(createSong(newSong));
    setDescription('');
    setTitle('');
    setEditMode(false);
    dispatch(getSongs());
    // songDataToSave = null;
  };

  const handleUpdate = (id, songDataToUpdate) => {
    const songData = {
      id: id,
      title: title,
      description: description,
      song: songDataToUpdate,
    };
    dispatch(updateSong(id, songData));
  };

  return (
    <form
      className="add-song-form"
      onSubmit={editMode ? handleUpdate : handleSave}
    >
      <h1>Enter Song Information</h1>
      {/* {songData && (
          <div className="song-summary">
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
      <input
        className="add-song-input"
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        name="title"
        value={editMode ? songDataToSave.title : title}
        placeholder="Title"
      />

      <textarea
        className="add-song-textarea"
        onChange={(event) => setDescription(event.target.value)}
        value={editMode ? songDataToSave.description : description}
        name="description"
        placeholder="Description"
      />
      <button className="submit-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default SongForm;
