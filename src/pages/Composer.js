import React, { useState, useEffect } from 'react';
import './Composer.css';
import * as Tone from 'tone';
import classNames from 'classnames';
import NoteButton from '../components/NoteButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSong } from '../redux/actions/songs';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SongForm from '../components/Library/SongForm';
// function touchStarted() {
//   getAudioContext().resume();
// }

const generateGrid = () => {
  const grid = [];

  for (let i = 0; i < 16; i++) {
    const column = [
      { note: 'C5', isActive: false },
      { note: 'B4', isActive: false },
      { note: 'A4', isActive: false },
      { note: 'G4', isActive: false },
      { note: 'F4', isActive: false },
      { note: 'E4', isActive: false },
      { note: 'D4', isActive: false },
      { note: 'C4', isActive: false },
      { note: 'B3', isActive: false },
      { note: 'A3', isActive: false },
      { note: 'G3', isActive: false },
      { note: 'F3', isActive: false },
      { note: 'E3', isActive: false },
      { note: 'D3', isActive: false },
      { note: 'C3', isActive: false },
    ];
    grid.push(column);
  }
  return grid;
};

// const OCTAVE = '4';

const Composer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [Sequencer, setSequencer] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songs = useSelector((state) => state.songs);
  const location = useLocation();
  console.log('location.state: ', location.state);
  const [editMode, setEditMode] = useState(
    location.state && location.state.editModeIsActive ? true : false
  );
  const [grid, setGrid] = useState(
    location.state && location.state.songToEditId
      ? songs.find((song) => {
          return song.id === location.state.songToEditId;
        }).song
      : generateGrid()
  );

  // console.log(
  //   'composer songtoeditid: ',
  //   location.state.songToEditId,
  //   songs.filter((song) => song.id === location.state.songToEditId)
  // );

  // console.log(
  //   'song: ',
  //   songs.filter((song) => {
  //     return song.id === location.state.songToEditId;
  //   })[0]
  // );

  console.log(
    'song to edit / editMode COMPOSER: ',
    grid,
    location.state.editModeIsActive
  );
  // if (location.state) {
  //   setGrid(location.state.songData);
  // } else {
  //   setGrid(generateGrid());
  // }
  // console.log('composer location data: ', location.state);

  // useEffect(() => {
  //   console.log('inital location state:', location.state);
  //   if (location.state.songDataToEdit !== null) {
  //     setGrid((prevState) => {
  //       return [prevState, ...location.state.songDataToEdit];
  //     });
  //     console.log('composer state: ', grid);
  //     console.log('composer location: ', location.state.songDataToEdit);
  //   }
  // }, []);

  const handleNoteClick = (clickedColumn, clickedNote, note) => {
    const synth = new Tone.PolySynth().toDestination();
    synth.triggerAttackRelease(note, '16n');
    // console.log(clickedColumn, clickedNote, note);
    let updatedGrid = grid.map((column, columnIndex) =>
      column.map((cell, cellIndex) => {
        let cellCopy = cell;

        if (columnIndex === clickedColumn && cellIndex === clickedNote) {
          cellCopy.isActive = !cell.isActive;
        }
        return cellCopy;
      })
    );
    setGrid((prevState) => {
      return updatedGrid;
    });
  };

  const handleClear = () => {
    stopMusic();
    setGrid(generateGrid());
  };

  const playMusic = async () => {
    console.log(grid);
    const synth = new Tone.PolySynth().toDestination();
    const Sequencer = new Tone.Sequence(
      (time, step) => {
        setCurrentColumn(step);
        // console.log(step);

        Tone.context.resume();

        synth.triggerAttackRelease(music[step], '16n', time);
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      '8n'
    );

    setSequencer(Sequencer);

    const music = [];
    grid.map((column) => {
      let columnNotes = [];
      column.map(
        (cell) =>
          // shouldPlay.isActive && columnNotes.push(shouldPlay.note + OCTAVE)
          cell.isActive && columnNotes.push(cell.note)
      );
      music.push(columnNotes);
    });

    await Tone.start();

    setIsPlaying(true);

    Sequencer.start();
    Tone.Transport.start();
  };

  const stopMusic = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentColumn(null);

      Tone.Transport.stop();
      await Sequencer.stop();
      await Sequencer.clear();
      await Sequencer.dispose();

      return;
    }
  };

  // const handleSave = () => {
  //   navigate('/library', {
  //     state: {
  //       songDataToSave: grid,
  //     },
  //   });
  // };

  return (
    <div className="composer">
      <div className="composer-title">Compose</div>
      {/* composer element */}
      <div className="composer-container">
        {location.state && location.state.editMode ? (
          <SongForm
            songDataToSave={
              songs.filter((song) => {
                return song.id === location.state.songToEditId;
              })[0]
            }
            setEditMode={setEditMode}
            editMode={location.state.editModeIsActive}
          />
        ) : (
          <SongForm
            songDataToSave={grid}
            editMode={location.state.editModeIsActive}
            setEditMode={setEditMode}
          />
        )}
        <div className="note-wrapper">
          {grid.map((column, columnIndex) => (
            <div
              className={classNames('note-column', {
                'note-column--active': currentColumn === columnIndex,
              })}
              key={columnIndex + 'column'}
            >
              {column.map(({ note, isActive }, noteIndex) => (
                <NoteButton
                  note={note}
                  isActive={isActive}
                  onClick={() => handleNoteClick(columnIndex, noteIndex, note)}
                  key={note + columnIndex}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="button-container">
          <button className="button" onClick={() => playMusic()}>
            Play
            <PlayArrowIcon />
          </button>
          <button className="button" onClick={() => stopMusic()}>
            Stop
            <StopIcon />
          </button>
          {/* {editMode ? (
            <button className="button" onClick={() => handleSave()}>
              <Navigate
              to={{
                pathname: '/library',
                state: { songData: grid },
              }}
            />
              Save to Library
            </button>
          ) : (
            <button
              className="button"
              onClick={() => handleUpdate(location.state.songToEditId)}
            >
              <Navigate
              to={{
                pathname: '/library',
                state: { songData: grid },
              }}
            />
              Update Song
            </button>
          )} */}
          <button className="button" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Composer;
