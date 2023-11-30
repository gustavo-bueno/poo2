import { client } from "./client";

export const getMovies = async () => {
  const { data } = await client.get("/movies");
  return data;
};

export const getMoviesWithGenre = async () => {
  const { data } = await client.get("/views/movies");
  return data;
};

export const getMoviesByid = async (id) => {
  const { data } = await client.get(`/movies/${id}`);
  return data;
};

export const createMovie = async (movieData) => {
  const { data } = await client.post(`/movies`, movieData);
  return data;
};

export const updateMovie = async (movieData) => {
  const { data } = await client.put(`/movies`, movieData);
  return data;
};

export const deleteMovie = async (id) => {
  await client.delete(`/movies/${id}`);
};
