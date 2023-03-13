import { Router } from "express";
import { version } from "../package.json";
import { Knex } from "knex";

export const api = (db: Knex<any, unknown[]>) => {
	const api = Router();
	api.use("/healcheck", (req, res) => {
		res.json({
			message: "healthy",
			version,
		});
	});

	// TODO: add more endpoints
	return api;
};
