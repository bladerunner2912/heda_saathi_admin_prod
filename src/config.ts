import * as dotenv from "dotenv";
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const DB_PROD = process.env.DB_PROD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@devhedasaathi.pwxdhtj.mongodb.net/${DB_PROD}?retryWrites=true&w=majority`;

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID || "";
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY || "";
const BUCKET_NAME = process.env.BUCKET_NAME || "";
const REGION_NAME = process.env.REGION_NAME || "ap-south-1";
const FAST_SMS_API_KEY = process.env.FAST_SMS_API_KEY;

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
  awsBucket: {
    accessKey: ACCESS_KEY_ID,
    secretKey: SECRET_ACCESS_KEY,
    bucketName: BUCKET_NAME,
    regionName: REGION_NAME,
  },
  otp: {
    apiKey: FAST_SMS_API_KEY
  }
};
