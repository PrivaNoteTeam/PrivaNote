import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
require('dotenv').config();
import { PrismaClient } from '@prisma/client';
import { setupContext } from './middleware/setupContext';
import { router } from './routes';

const main = async () => {
	const app = express();
	const HTTP_PORT = process.env.PORT || 8080;

	app.use(setupContext({ prisma: new PrismaClient() }));
	app.use(cors());
	app.use(express.json());
	app.use(
		session({
			store: new (connectPgSimple(session))({
				conString: process.env.DATABASE_URL
			}),
			secret: 'secret key',
			resave: false,
			saveUninitialized: true,
			cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 } // 2 days
		})
	);

	app.get('/', (_, res) => {
		res.send(`<h1>Hello World. Welcome to PrivaNote!</h1>`);
	});

	app.post('/logout', (req, res) => {
		req.session.destroy(() => {});
		res.redirect('/');
	});

	app.use('/api', router);

	app.listen(HTTP_PORT, () => {
		console.log('Listening on port ' + HTTP_PORT);
	});
};

main()
	.finally(() => {
		//ctx.prisma.$disconnect();
	})
	.catch((error) => {
		console.error(error);
	});
