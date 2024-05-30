import dotenv from "dotenv";

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "siptatif_db";

const MYSQL = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const JWT_SECRET = process.env.JWT_SECRET || "3b8e2f8e5b8e2f8e5b8e2f8e5b8e2f8e5b8e2f8e5b8e2f8e5b8e2f8e5b8e2f8e";

const config = {
  mysql: MYSQL,
  server: SERVER,
  jwtSecret: JWT_SECRET,
};

export default config;
