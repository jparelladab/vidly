import _ from 'lodash';

export function sortMovies(movies, {path, order}){
    let sorted = _.orderBy(movies, [path], [order]);
    return sorted;
};
