import React, {Component} from 'react';
import Like from '../common/like';


class Movie extends Component {

  render(){
    const {movie, columns} = this.props;
    return (
      <tr>
        {columns.map (column => {
          if (column.path == 'genre.name'){
            return <td key={column.path }>{movie.genre.name}</td>
          } else {
            return <td key={column.path || column.key}>{column.content ? column.content(movie) : movie[column.path]}</td>
          }
        })}
      </tr>
    );
  }
}

export default Movie;
