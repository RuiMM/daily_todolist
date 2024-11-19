const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev
  ? ""
  : "https://your-railway-app-url.railway.app";
