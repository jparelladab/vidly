import React, {Component} from 'react';
import Movie from './movie';
import {getMovies, deleteMovie} from '../services/fakeMovieService';


class Movies extends Component{
  state = {
    movies: getMovies()
  };

 handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({movies: getMovies()});
  }

  render(){
  // const {movies} = this.state;
  const {length: count} = this.state.movies;
    if (count === 0) return <p>There are no movies</p>
    return (
      <React.Fragment>
        <p>Showing {count} movies</p>

          <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                </tr>
              </thead>
            <tbody>
                { this.state.movies.map (movie =>
                  <Movie
                    movie={movie}
                    key={movie._id}
                    onDelete={ this.handleDelete }
                  />
                  ) }
            </tbody>
          </table>
      </React.Fragment>
    );

}

}



export default Movies;
