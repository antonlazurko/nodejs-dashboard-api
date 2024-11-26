import 'reflect-metadata';
import { Container } from 'inversify';

import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { TYPES } from '../types/types';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	findByEmail: jest.fn(),
	createUser: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

let createdUser: UserModel | null;

beforeAll(() => {
	container.bind<IUserService>(TYPES.IUserService).to(UserService);
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.IConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
	usersService = container.get<IUserService>(TYPES.IUserService);
});

describe('User Service', () => {
	const user = {
		email: 'test@mail.com',
		name: 'test',
		password: 'test',
	};
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.createUser = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: '1',
				createdAt: new Date(),
				updatedAt: new Date(),
			}),
		);
		createdUser = await usersService.createUser(user);
		expect(createdUser?.id).toEqual('1');
		expect(createdUser?.password).not.toEqual(user.password);
	});

	it('validateUser - success', async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser(user);
		expect(res).toBeTruthy();
	});

	it('validateUser - wrong password', async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			...user,
			password: '2',
		});
		expect(res).toBeFalsy();
	});

	it('validateUser - wrong user', async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValueOnce(null);
		const res = await usersService.validateUser(user);
		expect(res).toBeFalsy();
	});
});
