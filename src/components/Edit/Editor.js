import React, { useState, useEffect } from 'react';
import './Editor.css';
import * as Tone from 'tone';
import classNames from 'classnames';
import NoteButton from '../NoteButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSong } from '../../redux/actions/songs';
import { generateGrid } from '../../functions/functions';
// import { TextField, Button, Typography, Paper } from '@material-ui/core';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
// import SongForm from '../components/Library/SongForm';
// function touchStarted() {
//   getAudioContext().resume();
// }

// const OCTAVE = '4';

const Editor = ({ songGrid, setSongGrid }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [Sequencer, setSequencer] = useState(null);
  // const [grid, setGrid] = useState(generateGrid());

  const location = useLocation();

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const songsStore = useSelector((state) => state.songs.songs);
  // console.log('location.state: ', location.state);
  // const [editMode, setEditMode] = useState(
  //   location.state && location.state.editModeIsActive ? true : false
  // );
  // const [grid, setGrid] = useState(
  //   location.state && location.state.songToEditId ? songsStore.find((song) => {
  //
  //         return song.id === location.state.songToEditId;
  //       }).song
  //     : generateGrid()
  // );

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

  // console.log(
  //   'song data format: ',
  //   songsStore.filter((song) => {
  //     return song.id === location.state.songToEditId;
  //   })[0]
  // );
  // console.log(
  //   'song to edit / editMode COMPOSER: ',
  //   grid,
  //   location.state.editModeIsActive
  // );
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
    let updatedGrid = songGrid.map((column, columnIndex) =>
      column.map((cell, cellIndex) => {
        let cellCopy = cell;

        if (columnIndex === clickedColumn && cellIndex === clickedNote) {
          cellCopy.isActive = !cell.isActive;
        }
        return cellCopy;
      })
    );
    setSongGrid((prevState) => {
      return updatedGrid;
    });
  };

  const handleClear = () => {
    stopMusic();
    setSongGrid(generateGrid());
  };

  const playMusic = async () => {
    console.log(songGrid);
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
    songGrid.map((column) => {
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
    <div className="editor">
      {/* composer element */}
      <div className="editor-container">
        <div className="note-wrapper">
          {songGrid.map((column, columnIndex) => (
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

export default Editor;
