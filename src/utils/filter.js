

export function filter(items, genre){
    if (genre){
      let filterMovies = items.filter( m => m.genre._id === genre._id);
      return filterMovies;
    } else {
      return items;
    }
}

export function filterMovieTitle(movies, term){
  return movies.filter(m => m.title.includes(term))
}
