import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: required("MONGO_URI"),
  jwtSecret: required("JWT_SECRET"),
  adminEmail: required("ADMIN_EMAIL"),
  adminPasswordHash: required("ADMIN_PASSWORD_HASH"),
  corsOrigin: required("CORS_ORIGIN"),
};
