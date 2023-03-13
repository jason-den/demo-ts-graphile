import bodyParser from "body-parser";
import http from "http";
import express from "express";
import { errorHandler } from "./express-error-handler";
import { connection, pool } from "./db";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
// import api from './api'
const BODY_LIMIT = process.env.BODY_LIMIT || "100kb";

console.log({ connection, pool });

const app = express();
const server = http.createServer(app);

// Cors
const corsWhitelist = process.env.FRONTEND_URL?.split(",");
const corsConfig: CorsOptions = {
	origin: corsWhitelist,
	credentials: true,
	optionsSuccessStatus: 200,
};
app.use(cors(corsConfig));

app.use(helmet());
app.use(bodyParser.json({ limit: BODY_LIMIT }));
app.use(errorHandler);

// TODO: setup postgraphile instance for main app
