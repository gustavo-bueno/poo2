import axios from "axios";
import { notification } from "antd";

export const client = axios.create({
  baseURL: "http://localhost:8000",
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error) {
      console.error(error);
      if (notification)
        notification.error({
          message: "Ops, houve um erro inesperado. Tente novamente mais tarde",
        });
      return;
    }
  }
);
