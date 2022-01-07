
import http from "./httpService";
import {getGenres} from '../services/genreService';



export async function getMovies() {
  const movies = await http.get('http://localhost:3900/api/movies');
  return movies.data;
}

export async function getMovie(id) {
    const movies = await getMovies();
  return movies.find(m => m._id === id);
}

export async function saveMovie(movie) {
    let mov = {...movie};
    delete mov._id;
    let res;
    if (!movie._id) {
        console.log(mov);
        res = await http.post('http://localhost:3900/api/movies', mov);
    } else {
        res = await http.put('http://localhost:3900/api/movies/' + movie._id, mov);
    }

    return res.data;
}

export async function deleteMovie(id) {
  return await http.delete('http://localhost:3900/api/movies/' + id);
}
