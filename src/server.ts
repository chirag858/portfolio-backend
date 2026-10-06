import { app } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});

connectDB().catch((err) => {
  console.error("MongoDB connection failed (API routes needing the DB will error until it's reachable):", err);
});
