import axios from 'axios';

const url = 'http://localhost:5000/song';

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
};

export const getSongs = () => axios.get(url + '/get');

export const createSong = (newSong) =>
  axios.post(url + '/add', newSong, config);
// .then((response) => {
//   console.log('post response', response);
// })
// .catch((error) => {
//   console.log('post error: ', error);
// });

export const updateSong = (id, updatedSong) =>
  axios.patch(`${url}/${id}`, updatedSong);

export const deleteSong = (id) => axios.delete(`${url}/${id}`);
