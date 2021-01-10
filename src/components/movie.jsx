import React, {Component} from 'react';


class Movie extends Component {

  render(){
    const movie = this.props.movie;
    return (
      <tr>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td><button className='btn btn-danger btn-sm' onClick={ () => this.props.onDelete(movie) }>X</button></td>
      </tr>

    );
  }
}

export default Movie;
