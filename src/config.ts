import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

const MONGO_USERNAME = process.env.MONGO_USERNAME || "bladerunner";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "daisy2308";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@devhedasaathi.pwxdhtj.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
