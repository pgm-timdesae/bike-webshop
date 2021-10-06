import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const HOSTNAME = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || 8081;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'theboys_tim-and-nicolas';
export const JWT_LIFETIME = process.env.LIFETIME || "3600";