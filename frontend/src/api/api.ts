import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    // ensure headers exist and attach the token
    config.headers.Authorization = `Bearer ${token}`;
  }
  // if (token && config.headers) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getSections = async (chapterId: string) => {
  const res = await API.get(`/chapters/${chapterId}/sections`);
  return res.data;
};

export const getAnnotations = async (contentId: string) => {
  const res = await API.get(
    `/annotations?content_type=section&content_id=${contentId}`
  );
  return res.data;
};

export default API;

// attach token to requests

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;