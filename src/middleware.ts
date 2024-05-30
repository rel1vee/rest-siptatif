import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "./config/config";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. Malformed token.");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

export default authenticateJWT;