import React, {Component} from 'react';
import Movie from './movie';
import {getMovies, deleteMovie} from '../services/fakeMovieService';


class Movies extends Component{
  state = {
    movies: getMovies(),
    likes: []
  };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({movies: getMovies()});
  }

  isLiked = (movie) => {
    return this.state.likes.indexOf(movie) >= 0 ? true : false;
  }

  handleLike = (movie) => {
    let likes = [...this.state.likes];
    let index = likes.indexOf(movie);
    console.log(index);
    console.log('before',likes);
    if (index === -1) {
      likes.push(movie);
    } else {
      likes = likes.filter(m => m._id !== movie._id);
    }
    this.setState({likes});
    console.log('after', this.state.likes);
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
                  <th></th>
                </tr>
              </thead>
            <tbody>
                { this.state.movies.map (movie =>
                  <Movie
                    movie={movie}
                    key={movie._id}
                    onDelete={ this.handleDelete }
                    onLike={this.handleLike}
                    isLiked={this.isLiked(movie)}
                  />
                  ) }
            </tbody>
          </table>
      </React.Fragment>
    );

}

}



export default Movies;
