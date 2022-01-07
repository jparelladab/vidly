import http from "./httpService";

// export const genres_array = [
//   { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
//   { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
//   { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
// ];

export async function getGenres() {
    const genres = await http.get('http://localhost:3900/api/genres');
  return genres.data.filter(g => g);
}
