import type { IncomingMessage, ServerResponse } from "http";
import { app } from "../src/app";
import { connectDB } from "../src/config/db";

// Vercel's Node.js runtime invokes this function once per request, but the
// underlying Node process (and its module scope) is reused across "warm"
// invocations. We cache the Mongoose connection promise on the module scope
// so repeated requests reuse the same connection instead of reconnecting
// (and, if the first connection attempt fails, we clear the cache so the
// next request retries rather than being stuck on a rejected promise).
let dbConnectionPromise: Promise<void> | null = null;

function ensureDbConnection(): Promise<void> {
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().catch((err) => {
      dbConnectionPromise = null;
      throw err;
    });
  }
  return dbConnectionPromise;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await ensureDbConnection();
  } catch (err) {
    console.error("MongoDB connection failed (API routes needing the DB will error until it's reachable):", err);
  }
  return app(req, res);
}
