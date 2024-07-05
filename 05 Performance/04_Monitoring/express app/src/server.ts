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

//* https://www.npmjs.com/package/node-os-utils
import osu from "node-os-utils";
import OsCmd from "node-os-utils/lib/oscmd";

const t1 = performance.now();

//* https://www.npmjs.com/package/node-os-utils
const cpu = osu.cpu;
const count = cpu.count();
console.log(1, { count });

cpu.usage().then((cpuPercentage) => {
  console.log(2, { cpuPercentage });
});

const info = cpu.average();
console.log(3, { info });

cpu.free().then((info2) => {
  console.log(4, { info2 });
});

const mem = osu.mem;
mem.info().then((info3) => {
  console.log(5, { info3 });
});

const netstat = osu.netstat;
netstat.stats().then((info4) => {
  console.log(6, { info4 });
});

// @ts-ignore
const osCmd = osu.osCmd as OsCmd;
osCmd?.whoami().then((userName: string) => {
  console.log(7, { userName });
});

//* The server
const app: Express = express();

const corsOptions = {
  origin: true,
  methods: ["GET", "POST"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

//* Middlewares
app.use(cors(corsOptions));
// app.use(cookieParser());
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

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/favicon.svg"));
});
//* Test route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

//* Port
const portHTTP = (process.env.PORT || 5000) as number;

const httpServer = http.createServer(app);
httpServer.listen({ port: portHTTP }, () => {
  console.log(`Server is listening at http://localhost:${portHTTP}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

const t2 = performance.now();
console.log({ t1, t2 });
console.log("t2-t1:", t2 - t1);
