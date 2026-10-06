import { create } from "axios";

export const api = create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  timeout: 5000,
});
