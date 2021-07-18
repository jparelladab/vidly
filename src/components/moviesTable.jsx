import React, {Component} from 'react';
import Movie from './movie';
import TableHeader from '../common/tableHeader';
import TableBody from '../common/tableBody';
import Like from '../common/like';

  class MoviesTable extends Component {
    columns = [
      {path: 'title', label: 'Title'},
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
          <table className="table">
              <TableHeader 
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
              />
              <TableBody
                data={paginatedMovies}
                columns={this.columns}
              />
          </table>
  
  
        </React.Fragment>
      )  

    }
  }
   



  export default MoviesTable;

