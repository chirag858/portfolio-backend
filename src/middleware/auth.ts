import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) {
    res.status(401).json({ error: "Missing token" });
    return;
  }
  try {
    jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
