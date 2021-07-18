import React, {Component} from 'react';
import MoviesTable from './moviesTable';
import Pagination from '../common/pagination';
import {getMovies, deleteMovie} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService'
import {paginate} from '../utils/paginate';
import {filter} from '../utils/filter';
import {sortMovies} from '../utils/sort';
import PropTypes from 'prop-types';
import ListGroup from '../common/listGroup';


class Movies extends Component{
  state = {
    movies: [],
    genres: [],
    sortColumn: {path: 'title', order: 'asc'},
    likes: [],
    pageSize: 4,
    currentPage: 0,
    selectedGenre: ''
  };

  componentDidMount(){
    const genres = [{name: 'All Genres', _id: "0"}, ...getGenres()]
    this.setState({movies: getMovies(), genres})
  };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({movies: getMovies()});
  };

  liked = (movie) => {
    return this.state.likes.indexOf(movie) >= 0 ? true : false;
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  };

  handlePageChange = (page) => {
    this.setState({currentPage: page});
  }

  handleGenreSelect = (genre) => {
    genre = genre.name === 'All Genres' ? '' : genre;
    this.setState({
      selectedGenre: genre,
      currentPage: 0
    });
  };

  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  };

  render(){

    const { pageSize, currentPage, movies, selectedGenre, sortColumn } = this.state;
    const filteredMovies = filter(movies, selectedGenre);
    const sortedMovies = sortMovies(filteredMovies, sortColumn);
    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize );
    const {length: count} = filteredMovies;

    if (count === 0) return <p>There are no movies</p>

    return (
      <div className="movies-container">
        <ListGroup
          items={this.state.genres}
          selectedItem={selectedGenre}

          // not needed because of default props defined in ListGroup
          // textProperty="name"
          // valueProperty="_id"

          onItemSelect={this.handleGenreSelect}
        />

        <div>
          <MoviesTable
            paginatedMovies={paginatedMovies}
            count={count}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />

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
