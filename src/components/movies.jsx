import React, {Component} from 'react';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import {getMovies, deleteMovie} from '../services/movieService';
import {getGenres} from '../services/genreService';
import {paginate} from '../utils/paginate';
import {filter} from '../utils/filter';
import {sortMovies} from '../utils/sort';
import PropTypes from 'prop-types';
import ListGroup from './common/listGroup';
import SearchBar from './searchBar';
import { Link } from 'react-router-dom';

class Movies extends Component{
  state = {
    movies: [],
    genres: [],
    sortColumn: {path: 'title', order: 'asc'},
    likes: [],
    pageSize: 4,
    currentPage: 0,
    selectedGenre: '',
    searchTerm: ''
  };

  async componentDidMount(){
    const genresDB = await getGenres();
    const genres = [{name: 'All Genres', _id: "0"}, ...genresDB];
    console.log(genres);
    this.setState({movies: await getMovies(), genres})
  };

  handleDelete = async(movie) => {
    deleteMovie(movie._id);
    this.setState({movies: await getMovies()});
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
      currentPage: 0,
      searchTerm: ''
    });
  };

  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  };

  handleSearch = async(searchTerm) => {
    let movies = await getMovies();
    console.log(searchTerm);
    // let moviesLowerCase = movies.forEach(mov => mov.title.toLowerCase())
    movies = movies.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    this.setState({movies, searchTerm, selectedGenre: '', currentPage: 0});
  }

  getPagedData = () => {
    const { pageSize, currentPage, movies, selectedGenre, sortColumn } = this.state;
    const filteredMovies = filter(movies, selectedGenre);
    const sortedMovies = sortMovies(filteredMovies, sortColumn);
    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize );
    const {length: count} = filteredMovies;
    return {totalCount : count, data : paginatedMovies};
  }

  render(){
    //we refactor into getPagedData out of render() method
    const {totalCount, data} = this.getPagedData();
    const {searchTerm} = this.state;

    if (totalCount === 0) return <p>There are no movies</p>

    return (
      <div className="movies-container">
        <ListGroup
          items={this.state.genres}
          selectedItem={this.state.selectedGenre}

          // not needed because of default props defined in ListGroup
          // textProperty="name"
          // valueProperty="_id"

          onItemSelect={this.handleGenreSelect}
        />

        <div>
          <Link className="btn btn-primary" to="/movies/new">New Movie</Link>
          <p>Showing {totalCount} movies</p>
          <SearchBar searchTerm={searchTerm} onChange={this.handleSearch} />
          <MoviesTable
            paginatedMovies={data}
            movies={this.state.movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />

            <Pagination
              itemsCount={totalCount}
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
