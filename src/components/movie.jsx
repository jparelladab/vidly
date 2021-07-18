import React, {Component} from 'react';
import Like from '../common/like';


class Movie extends Component {

  render(){
    const {movie, columns} = this.props;

    return (
      <tr>
        {columns.map (column => 
            <td key={column.path || column.key}>{column.path ? movie[column.path ] : column.content(movie) }</td>
          )}
      </tr>
    );
  }
}

export default Movie;
