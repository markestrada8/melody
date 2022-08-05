const initialState = {
  editMode: false,
  songs: [],
};

export default function songs(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL':
      return { ...state, songs: [...action.payload] };
    // case 'GET_SONG':
    //   return { ...state, song: action.payload.song };
    case 'CREATE':
      return { ...state, songs: [...state.songs, action.payload] };
    case 'UPDATE':
      return state.songs.map((song) =>
        song.id === action.payload.id ? action.payload : song
      );
    case 'DELETE':
      return state.songs.filter((song) => song.id !== action.payload);
    case 'TOGGLE_EDIT_MODE':
      return { ...state, editMode: !state.editMode };
    default:
      return state;
  }
}
