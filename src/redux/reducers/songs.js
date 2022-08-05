export default (songs = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.payload;
    case 'GET_SONG':
      return { ...songs, song: action.payload.song };
    case 'CREATE':
      return [...songs, action.payload];
    case 'UPDATE':
      return songs.map((song) =>
        song.id === action.payload.id ? action.payload : song
      );
    case 'DELETE':
      return songs.filter((song) => song.id !== action.payload);

    default:
      return songs;
  }
};
