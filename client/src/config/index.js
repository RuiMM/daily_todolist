export const isLocal = location.hostname === "localhost";

export const API_BASE_URL = isLocal
  ? "127.0.0.1:3001"
  : "https://daily-todolist.vercel.app";
