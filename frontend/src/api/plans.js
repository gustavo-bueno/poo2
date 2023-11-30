import { client } from "./client";

export const getPlans = async () => {
  const { data } = await client.get("/plans");
  return data;
};

export const getPlansById = async (id) => {
  const { data } = await client.get(`/plans/${id}`);
  return data;
};

export const createPlan = async (genreData) => {
  const { data } = await client.post(`/plans`, genreData);
  return data;
};

export const updatePlan = async (genreData) => {
  const { data } = await client.put(`/plans`, genreData);
  return data;
};

export const deletePlan = async (id) => {
  const { data } = await client.delete(`/plans/${id}`);
  return data;
};
