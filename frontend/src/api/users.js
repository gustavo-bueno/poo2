import { client } from "./client";

export const getUsers = async () => {
  const { data } = await client.get("/users");
  return data;
};

export const getUsersByEmail = async (email) => {
  const { data } = await client.get(`/users/${email}`);
  return data;
};

export const createUser = async (userData) => {
  const { data } = await client.post(`/users`, userData);
  return data;
};

export const updateUser = async (userData) => {
  const { data } = await client.put(`/users`, userData);
  return data;
};

export const deleteUser = async (email) => {
  const { data } = await client.delete(`/users/${email}`);
  return data;
};
