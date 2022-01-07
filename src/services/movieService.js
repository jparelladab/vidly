
import http from "./httpService";
import {apiUrl} from "../config.json";

//small url refactor
function movieUrl(id){
    return `${apiUrl}/movies/${id}`;
}

export async function getMovies() {
  return await http.get(apiUrl + '/movies');
}

export async function getMovie(id) {
    return await http.get(movieUrl(id))
}

export async function saveMovie(movie) {
    let body = {...movie};
    delete body._id;
    if (!movie._id) {
        return await http.post(apiUrl + '/movies', body);
    } else {
        return await http.put(movieUrl(movie._id), body);
    }
}

export async function deleteMovie(id) {
  return await http.delete(movieUrl(id));
}
