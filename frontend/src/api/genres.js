import { client } from "./client";

export const getGenres = async () => {
  const { data } = await client.get("/genres");
  return data;
};

export const getGenresById = async (id) => {
  const { data } = await client.get(`/genres/${id}`);
  return data;
};

export const createGenre = async (genreData) => {
  const { data } = await client.post(`/genres`, genreData);
  return data;
};

export const updateGenre = async (genreData) => {
  const { data } = await client.put(`/genres`, genreData);
  return data;
};

export const deleteGenre = async (id) => {
  const { data } = await client.delete(`/genres/${id}`);
  return data;
};
