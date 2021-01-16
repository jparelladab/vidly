import React, {Component} from 'react';
import Movie from './movie';
import Pagination from '../common/pagination';
import {getMovies, deleteMovie} from '../services/fakeMovieService';
import {paginate} from '../utils/paginate';
import PropTypes from 'prop-types';


class Movies extends Component{
  state = {
    movies: getMovies(),
    likes: [],
    pageSize: 4,
    currentPage: 0
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
    if (index === -1) {
      likes.push(movie);
    } else {
      likes = likes.filter(m => m._id !== movie._id);
    }
    this.setState({likes});
  }

  handlePageChange = (page) => {
    this.setState({currentPage: page});
  }

  render(){

  const {length: count} = this.state.movies;
  const { pageSize, currentPage, movies } = this.state;
  const paginatedMovies = paginate(movies, currentPage, pageSize );

    if (count === 0) return <p>There are no movies</p>
    return (
      <div className="movies-container">

        <div className="movies-filter">
          <ul className="list-group">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
        <div>
          <p>Showing {count} movies</p>

            <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th className="col">Title</th>
                    <th className="col">Genre</th>
                    <th className="col">Stock</th>
                    <th className="col">Rate</th>
                    <th className="col"></th>
                    <th className="col"></th>
                  </tr>
                </thead>
              <tbody className="table-striped">
                  { paginatedMovies.map (movie =>
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

            <Pagination
              itemsCount={count}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />

          </div>

      </div>
    );
  }
}

//Adding Proptypes to catch bugs
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}



export default Movies;
