import { client } from "./client";

export const getMoviesBackup = async () => {
  const { data } = await client.get("/backup/movies");

  return data;
};

export const getSeriesBackup = async () => {
  const { data } = await client.get("/backup/series");
  return data;
};
