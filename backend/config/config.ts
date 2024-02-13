import dotenv from 'dotenv'

const SERVER_PORT = process.env.PORT;
const SERVER_ENV = process.env.NODE_ENV;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "NORMAL_USER";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "SUPER_ENCRYPTION";

export const config = {
    port: SERVER_PORT,
    token_expire_time : SERVER_TOKEN_EXPIRETIME,
    token_secret: SERVER_TOKEN_SECRET,
    token_user: SERVER_TOKEN_ISSUER
}