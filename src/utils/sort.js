export function sortMovies(movies, {path, order}){
  const mov = movies.sort(function(a,b){
    return a.title - b.title });
  mov.forEach((a,b,c) => console.log(a.title));
  let sorted;
  if (path === 'genre'){
    sorted = movies.sort(function(a,b){
    return a[path] - b[path]['name'];
  });
  } else {
    sorted = movies.sort(function(a,b){
    return a[path] - b[path];
    });
  }
  if (order === 'desc'){
    sorted = sorted.reverse();
  }
  //console.log(sorted);
  return sorted;
}
