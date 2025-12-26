const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

console.log("OMDb API KEY:", import.meta.env.VITE_OMDB_API_KEY);

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}&type=movie`
  );
  return res.json();
};

export const getMovieDetails = async (imdbID) => {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  );
  return res.json();
};
