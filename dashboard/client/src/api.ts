import axios from "axios";

//containers talk to each other using service names
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4001",
// });
const API = axios.create({
  baseURL: "http://localhost:4001",
});

export const getMetrics = async () => {
  const res = await API.get("/metrics");
  return res.data;
};