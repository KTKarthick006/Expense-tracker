import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Secure in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
  // store: MongoStore.create({
  //   mongoUrl: process.env.MONGO_URI,
  //   ttl: 24 * 60 * 60, // 1 day
  // }),
};

export default sessionConfig;
