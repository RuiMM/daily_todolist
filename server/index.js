import app from "./app.js";

const PORT = process.env.PORT || 3001;

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

app.listen(PORT, () => {
  console.log(`✨ Server running on http://localhost:${PORT}`);
});
