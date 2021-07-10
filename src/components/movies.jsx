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
    likes: [],
    pageSize: 4,
    currentPage: 0,
    genres: [],
    selectedGenre: '',
    sortColumn: ''
  };

  componentDidMount(){
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
      sortColumn: {path: 'title', order: 'asc'}
    });
  };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({movies: getMovies()});
  };

  isLiked = (movie) => {
    return this.state.likes.indexOf(movie) >= 0 ? true : false;
  };

  handleLike = (movie) => {
    let likes = [...this.state.likes];
    let index = likes.indexOf(movie);
    if (index === -1) {
      likes.push(movie);
    } else {
      likes = likes.filter(m => m._id !== movie._id);
    }
    this.setState({likes});
  };

  handlePageChange = (page) => {
    this.setState({currentPage: page});
  }

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 0
    });
  };

  handleSort = (column) => {
    let order = this.state.sortColumn.order;
    if (this.state.sortColumn.path === column){
      if (order === 'asc'){
        order = 'desc';
      } else {
        order = 'asc';
      }
    }
    this.setState({sortColumn: {path: column, order}});
    console.log(this.state.sortColumn);
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
            handleDelete={this.handleDelete}
            handleLike={this.handleLike}
            isLiked={this.isLiked}
            onSort={this.handleSort}
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
