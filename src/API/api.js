import axios from 'axios'

// const url = 'http://localhost:5000/song'
const url = 'https://mae-melody-server.herokuapp.com/song'

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
}

export const getSongs = () => axios.get(url + '/get')

export const createSong = (newSong) =>
  axios.post(url + '/add', newSong, config)

export const updateSong = (id, updatedSong) =>
  axios.put(url + `/${id}`, updatedSong, config)

export const deleteSong = (id) => axios.delete(`${url}/${id}`)
