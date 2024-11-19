const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev ? "" : import.meta.env.VITE_API_URL;
