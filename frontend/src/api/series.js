import { client } from "./client";

export const getSeries = async () => {
  const { data } = await client.get("/series");
  return data;
};

export const getSeriesWithGenre = async () => {
  const { data } = await client.get("/views/series");
  return data;
};

export const getSeriesByid = async (id) => {
  const { data } = await client.get(`/series/${id}`);
  return data;
};

export const createSerie = async (serieData) => {
  const { data } = await client.post(`/series`, serieData);
  return data;
};

export const updateSerie = async (serieData) => {
  const { data } = await client.put(`/series`, serieData);
  return data;
};

export const deleteSerie = async (id) => {
  const { data } = await client.delete(`/series/${id}`);
  return data;
};
