import React from 'react';
import Movie from './movie';


  const MoviesTable = (props) => {
    const {
      count,
      paginatedMovies,
      handleDelete,
      handleLike,
      isLiked,
      onSort } = props;

    return(

      <React.Fragment>
        <p>Showing {count} movies</p>
        <table className="table">
            <thead className="thead-dark">
              <tr>
                <th
                  onClick={() => onSort('title')}
                  className="col cursor-pointer">Title</th>
                <th
                  onClick={() => onSort('genre.name')}
                  className="col cursor-pointer">Genre</th>
                <th
                  onClick={() => onSort('numberInStock')}
                  className="col cursor-pointer">Stock</th>
                <th
                  onClick={() => onSort('dailyRentalRate')}
                  className="col cursor-pointer">Rate</th>

                <th className="col"></th>
                <th className="col"></th>
              </tr>
            </thead>
          <tbody className="table-striped">
              { paginatedMovies.map (movie =>
                <Movie
                  movie={movie}
                  key={movie._id}
                  onDelete={ handleDelete }
                  onLike={handleLike}
                  isLiked={isLiked(movie)}
              />
                ) }
          </tbody>
        </table>


      </React.Fragment>
    )

  }

  export default MoviesTable;

