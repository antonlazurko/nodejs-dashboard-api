import request from 'supertest';
import { App } from '../src/app';
import { boot } from '../src/main';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users E2E', () => {
	const testUser = { email: 'irina@mail.com', password: 'test123', name: 'test' };

	test('register error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'test@mail', name: 'test', password: 'test' });
		expect(res.status).toBe(422);
	});
	test('Login successful', async () => {
		const res = await request(application.app).post('/users/login').send(testUser);
		expect(res.status).toBe(200);
		expect(res.body.jwt).not.toBeUndefined();
	});

	test('Login error', async () => {
		const { status } = await request(application.app)
			.post('/users/login')
			.send({ ...testUser, password: testUser.password + '1' });
		expect(status).toBe(401);
	});

	test('Info successful', async () => {
		const { body } = await request(application.app).post('/users/login').send(testUser);

		const { body: infoBody } = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${body.jwt}`);

		expect(infoBody.email).toBe(testUser.email);
	});

	test('Info error', async () => {
		await request(application.app).post('/users/login').send(testUser);

		const { statusCode, body } = await request(application.app)
			.get('/users/info')
			.set('Authorization', 'Bearer wrong jwt');

		console.log(body);

		expect(statusCode).toBe(401);
		expect(body.err).toBe('Unauthorized');
	});
});

afterAll(() => {
	application.close();
});
