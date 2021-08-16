import React, {Component} from 'react';
import Like from '../common/like';
import { Link } from 'react-router-dom';


class Movie extends Component {

  //I've wrapped this logic in a method instead of having it inside the render
  renderCell = (movie, column) => {
    if (column.path == 'genre.name'){
      return <td key={column.path }>{movie.genre.name}</td>
    } else {
      return <td key={column.path || column.key}>{column.content ? column.content(movie) : movie[column.path]}</td>
    }
  }

  render(){
    const {movie, columns} = this.props;
    return (
      <tr>
        {columns.map (column => this.renderCell(movie, column))}
      </tr>
    );
  }
}

export default Movie;
