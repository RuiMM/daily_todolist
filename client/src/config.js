const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev ? "" : "/api";