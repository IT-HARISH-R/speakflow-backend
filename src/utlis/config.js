import dotenv from "dotenv";
dotenv.config();

export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const PORT = process.env.PORT;
export const SECRET_KEY = process.env.SECRET_KEY;
export const EMAIL = process.env.EMAIL;
export const PASS = process.env.PASS;
export const KEY_ID = process.env.KEY_ID;
export const KEY_SECRET = process.env.KEY_SECRET;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
