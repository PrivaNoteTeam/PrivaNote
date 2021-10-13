import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
require('dotenv').config();
import { UserSession } from './types';
import { PrismaClient } from '@prisma/client';
import { registerValidation } from './validation/registerUserValidation';
import { setupContext } from './middleware/setupContext';
import { createUser } from './database/createUser';
import argon2 from 'argon2';

const main = async () => {
	const app = express();
	const HTTP_PORT = 8080;

	const userLogin: UserSession = {
		id: 12,
		email: 'mark.recile@senecacollege.ca',
		password: 'PrivaNoteRocks'
	};

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
		res.send(`<h1>Hello World</h1>`);
	});

	app.post('/register', async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		const hashedPassword = await argon2.hash(password);

		const error = await registerValidation(req.ctx!, {
			email,
			password: hashedPassword
		});

		if (error) {
			res.status(409).json(error);
			return;
		}

		const user = await createUser(req.ctx!, {
			email,
			password: hashedPassword
		});

		if (!user) {
			res.status(400).json({
				message: 'user could not be created'
			});
		}

		res.status(200).json(user);
	});

	app.post('/login', (req, res) => {
		console.log(req.body);
		let username = req.body.username;
		let password = req.body.password;
		let errors = [];
		if (username == userLogin.email && password == userLogin.password) {
			req.session.user = userLogin;
			// return res.status(200).send();
		} else if (username != userLogin.email) {
			errors.push({
				field: 'username',
				message: 'This username does not exist'
			});
		} else if (
			username == userLogin.email &&
			password != userLogin.password
		) {
			errors.push({ field: 'password', message: 'Invalid password' });
		}

		if (req.session.user && errors.length === 0) {
			return res.status(200).json({ message: 'Login Success!' });
		} else {
			return res.status(500).json(errors);
		}
	});

	app.get('/test', (req, res) => {
		if (req.session.user) {
			res.send(
				`<h1>Hello user id ${req.session.user.id}, your email is ${req.session.user.email} and password is ${req.session.user.password}</h1>`
			);
		} else {
			res.send('<h1>Please login</h1>');
		}
	});

	app.post('/logout', (req, res) => {
		req.session.destroy(() => {});
		res.redirect('/');
	});

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
