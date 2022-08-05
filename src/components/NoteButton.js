import React from 'react';

const NoteButton = ({ note, isActive, ...props }) => {
  const classes = isActive ? 'note note--active' : 'note';
  return (
    <button className={classes} {...props}>
      {note}
    </button>
  );
};

export default NoteButton;
