import React, {Component} from 'react';
import Movie from './movie';

import Table from '../common/table';
import Like from '../common/like';
import { Link } from 'react-router-dom';

  class MoviesTable extends Component {
    columns = [
      {path: 'title', label: 'Title', content: movie => <Link to={"/movies/" + movie._id}>{movie.title}</Link>},
      {path: 'genre.name', label: 'Genre'},
      {path: 'numberInStock', label: 'Stock'},
      {path: 'dailyRentalRate', label: 'Rate'},
      {key: 'liked', content: movie => <Like onLike={this.props.onLike} liked={movie.liked} movie={movie} />},
      {key: 'delete', content: movie => <button className='btn btn-danger btn-sm' onClick={ () => this.props.onDelete(movie) }>X</button>}
    ];
    render() { 
      const {
        count,
        paginatedMovies,
        onDelete,
        onLike,
        onSort,
        sortColumn} = this.props;
    
      return(
        <React.Fragment>
          <p>Showing {count} movies</p>
          
          <Table
            columns={this.columns}
            sortColumn={sortColumn}
            onSort={onSort}
            data={paginatedMovies}
          />
  
        </React.Fragment>
      )  

    }
  }
   



  export default MoviesTable;

