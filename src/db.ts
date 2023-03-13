import knex from "knex";
import { Pool, PoolConfig } from "pg";

const { DB_HOSTNAME, DB_PASSWORD, DB_NAME, DB_PORT, DB_SSL, DB_USERNAME, DB_MAX_CONNECTIONS, DB_MIN_CONNECTIONS } =
	process.env;
const useSSL = DB_SSL?.toLowerCase() !== "false";

if (!DB_HOSTNAME || !DB_USERNAME || !DB_PASSWORD || !DB_NAME || !DB_PORT || !DB_PASSWORD) {
	throw new Error("DB secret not set!");
}
const poolConfig: PoolConfig = {
	min: parseInt(DB_MIN_CONNECTIONS ?? "", 10) || 2,
	max: parseInt(DB_MAX_CONNECTIONS ?? "", 10) || 15,
};

export const connection = knex({
	client: "pg",
	connection: {
		// connectString:
		host: DB_HOSTNAME,
		user: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		ssl: useSSL,
	},
	asyncStackTraces: true,
	pool: {
		...poolConfig,
		afterCreate(conn: any, done: any) {
			conn.query("SET timezone=UTC;", function (err: any) {
				if (err) {
					console.error(err);
					done(err, conn);
				} else {
					console.log("successfully connect with DB");
				}
			});
		},
	},
	acquireConnectionTimeout: 10000,
});

export const pool = new Pool(poolConfig);
