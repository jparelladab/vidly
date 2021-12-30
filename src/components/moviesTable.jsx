import React, {Component} from 'react';

import Table from './common/table';
import Like from './common/like';
import { Link } from 'react-router-dom';

  class MoviesTable extends Component {
    columns = [
      {path: 'title', label: 'Title', content: movie => <Link to={{pathname: "/movies/" + movie._id, state: {mov: movie, movs: this.props.movies}}} >{movie.title}</Link>},
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
        onSort,
        sortColumn} = this.props;
    
      return(
        <React.Fragment>
          {/* <a className="btn btn-primary" href="/movies/new">New Movie</a> */}
          <Link className="btn btn-primary" to="/movies/new"  >New Movie</Link>
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

