import path from "path";
import http from "http";

import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
// import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

//* The server
const app: Express = express();

const corsOptions = {
  origin: true,
  methods: ["POST", "GET", "OPTIONS"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Specify
};

//* Middlewares
app.set("trust proxy", true);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
// Compress all responses
app.use(compression({ level: 6 }));
app.use(
  cookieSession({
    signed: false,
    // secure: true,
  })
);

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/favicon.svg"));
});
//* Test route
app.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

app.use(errorHandler);
// app.all("/*splat", async (_req, _res, next) => {
//   next(new NotFoundError());
// });
// app.all("/*splat", async (_req, _res) => {
//   throw new NotFoundError();
// });

//^ Routes
app.use("", currentUserRouter);
app.use("", signinRouter);
app.use("", signoutRouter);
app.use("", signupRouter);

//* Port
const portHTTP = (process.env.HTTP_PORT || 3000) as number;

//* HTTP Server
const httpServer = http.createServer(app);
//* IPv4

(async function start(): Promise<void> {
  const JWT_KEY = process.env.JWT_KEY as string;

  if (!JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  //* MongoDB
  // await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then((con: { connection: { host: string } }) => {
      console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch((error: string) => console.log("Mongo DB Error => ", error));

  httpServer.listen({ port: portHTTP, host: "127.0.0.1" }, () => {
    console.log(`🚀 Server is listening at http://localhost:${portHTTP}`);
    // For testing only
    console.log("Current Time:", new Date().toLocaleTimeString());
  });
})();
