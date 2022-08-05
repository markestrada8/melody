import { TextField } from '@material-ui/core';
import './SongForm.css';

const SongForm = ({ title, setTitle, description, setDescription }) => {
  return (
    <div className="form-group">
      <h2>Enter Song Information</h2>

      <div className="inputs-container">
        <TextField
          id="standard-basic"
          className="add-song-input"
          onChange={(event) => setTitle(event.target.value)}
          label="Title"
          value={title}
          placeholder="Title"
        />

        <TextField
          id="standard-basic"
          className="add-song-textarea"
          onChange={(event) => setDescription(event.target.value)}
          label="Description"
          value={description}
          name="description"
          placeholder="Description"
        />
      </div>
    </div>
  );
};

export default SongForm;
