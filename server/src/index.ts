import express from 'express';
import cors from 'cors';
import pg, { Connection } from 'pg';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

const main = async () => {
	const app = express();

	const HTTP_PORT = 8080;

	const pgPool = new pg.Pool({
		// Insert pool options here
	});

	app.use(cors());
	app.use(
		session({
			store: new (connectPgSimple(session))({
				pool: pgPool,
				tableName: 'session'
			}),
			secret: 'secret key',
			resave: false,
			cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
		})
	);

	app.get('/', (_, res, __) => {
		res.send(`<h1>Hello from PrivaNote Server`);
	});

	app.listen(HTTP_PORT, () => {
		console.log('Listening on port ' + HTTP_PORT);
	});
};

main().catch((error) => {
	console.error(error);
});
