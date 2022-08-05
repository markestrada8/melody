import * as api from '../../API/api';

//ACTION CREATORS
//ACTUALLY, THESE ARE COMBINERS WHICH CALL ACTIONS ON REDUX STATE AND SERVER -> DATABASE

export const getSongs = () => async (dispatch) => {
  try {
    const { data } = await api.getSongs();
    dispatch({ type: 'GET_ALL', payload: data });
    // console.log('get action data response: ', data);
  } catch (error) {
    console.log('action get error: ', error);
  }
  // const action = { type: 'FETCH_ALL' };

  // dispatch(action);
};

export const createSong = (song) => async (dispatch) => {
  try {
    const { data } = await api.createSong(song);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log('action post error: ', error);
  }
};

// export const updatePost = (id, post) => async (dispatch) => {
//   try {
//     const { data } = await api.updatePost(id, post);

//     dispatch({ type: UPDATE, payload: data });
//   } catch (error) {
//     console.log('action update error: ', error);
//   }
// };

export const deleteSong = (id) => async (dispatch) => {
  try {
    await api.deleteSong(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log('action delete error: ', error);
  }
};

export const toggleEditMode = () => async (dispatch) => {
  try {
    dispatch({ type: 'TOGGLE_EDIT_MODE', payload: null });
  } catch (error) {
    console.log('action toggle error: ', error);
  }
};
