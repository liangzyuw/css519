import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
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