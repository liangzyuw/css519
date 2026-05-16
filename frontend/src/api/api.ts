import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

const METRICS_API = axios.create({ baseURL: "http://localhost:3000" });

// automates the inclusion of an authentication token to ensure your API can identify the user,
// crucial for maintaining secure sessions and controlling access to protected resources
// By intercepting outgoing requests,can seamlessly attach the token without needing 
// to manually include it in every API call, thus enhancing both security and developer experience.

API.interceptors.request.use((config) => {
  // registers a function that Axios will trigger automatically for every request made using that API instance.

  // attempt to retrieve a stored authentication string (like a JWT) from the browser's localStorage.
  const token = localStorage.getItem("token");
  
  //Checks if a token actually exists (e.g., if the user is currently logged in).
  if (token) {
    // ensure headers exist and attach the token
    // If the token is present, it modifies the request configuration to include an Authorization header with the token.
    // This tells the backend server who is making the request, allowing it to verify the token and determine if the request should be authorized.
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// report client metric
export const reportClientMetric = async (name: string, value: number) => {
  try {
    await METRICS_API.post("/metrics/client", { name, value });
  } 
  catch (err) {
    console.error("Failed to report client metric:", err);
  }
};

export const getChaptersByTextbookId = async (textbookId: string) => {
  const res = await API.get(`/textbooks/${textbookId}/chapters`);
  return res.data;
};

export const getSections = async (chapterId: string) => {
  const start = performance.now();

  const res = await API.get(`/chapters/${chapterId}/sections`);

  const duration = Math.round(performance.now() - start);
  await reportClientMetric("textbook_load_time_ms", duration);

  return res.data;
};

export const getAnnotations = async (contentId: string) => {
  const start = performance.now();

  const res = await API.get(
    `/annotations?content_type=section&content_id=${contentId}`
  );

  const duration = Math.round(performance.now() - start);
  await reportClientMetric("annotation_load_time_ms", duration);

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