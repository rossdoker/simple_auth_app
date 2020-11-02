import dotenv from 'dotenv';

dotenv.config();

export const DB_CONNECT = (process.env.DB_CONNECT as string);
export const APP_PORT = Number(process.env.APP_PORT) || 8888;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'abYBsdnrQzQY3mX3g9s5';
export const TOKEN_EXPIRATION_TIME = Number(process.env.TOKEN_EXPIRATION_TIME) || 432000000;