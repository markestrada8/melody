import React, { useState } from 'react';
import './Editor.css';
import * as Tone from 'tone';
import classNames from 'classnames';
import NoteButton from '../NoteButton';
// import { useLocation } from 'react-router-dom';

import { generateGrid } from '../../functions/functions';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const Editor = ({ songGrid, setSongGrid }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [Sequencer, setSequencer] = useState(null);

  // const location = useLocation();

  // const OCTAVE = '4'
  const handleNoteClick = (clickedColumn, clickedNote, note) => {
    const synth = new Tone.PolySynth().toDestination();
    synth.triggerAttackRelease(note, '16n');
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
    // console.log(songGrid);
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
    // eslint-disable-next-line
    songGrid.map((column) => {
      let columnNotes = [];
      column.map((cell) => cell.isActive && columnNotes.push(cell.note));
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

  return (
    <div className="editor">
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

          <button className="button" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
