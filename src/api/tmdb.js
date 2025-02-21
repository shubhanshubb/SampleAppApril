import axios from 'axios';

const API_KEY = '4de6b030e3794836baa44158f42b1b8c';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Get Now Playing Movies
export const getNowPlayingMovies = async page => {
  const response = await tmdb.get(
    `/movie/now_playing?language=en-US&page=${page}`,
  );
  return response.data.results;
};

// Get Popular Movies
export const getPopularMovies = async page => {
  const response = await tmdb.get(`/movie/popular?page=${page}`);
  return response.data.results;
};

// Get Top Rated Movies
export const getTopRatedMovies = async page => {
  const response = await tmdb.get(`/movie/top_rated?page=${page}`);
  return response.data.results;
};

// Get Upcoming Movies
export const getUpcomingMovies = async page => {
  const response = await tmdb.get(`/movie/upcoming?page=${page}`);
  return response.data.results;
};

// Get Movie Details by ID
export const getMovieDetails = async movieId => {
  const response = await tmdb.get(`/movie/${movieId}`);
  return response.data;
};
