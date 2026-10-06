import dns from "dns";
import mongoose from "mongoose";
import { env } from "./env";

// Some local/VPN DNS resolvers fail SRV lookups (mongodb+srv://) even though
// the record is valid — fall back to public resolvers so local dev isn't
// blocked by network-specific DNS quirks.
dns.setServers([...dns.getServers(), "8.8.8.8", "1.1.1.1"]);

export async function connectDB(): Promise<void> {
  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
}
