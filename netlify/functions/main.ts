import 'reflect-metadata';
import { Handler } from '@netlify/functions';
import { Container, ContainerModule, interfaces } from 'inversify';

import { App } from '../../src/app';
import { LoggerService } from '../../src/logger/logger.service';
import { UserController } from '../../src/users/users.controller';
import { ExceptionFilter } from '../../src/errors/exception.filter';
import { IExceptionFilter } from '../../src/errors/exception.filter.interface';
import { ILogger } from '../../src/logger/logger.interface';
import { IUserController } from '../../src/users/interfaces/user.controller.interface';
import { TYPES } from '../../src/types/types';
import { IUserService } from '../../src/users/interfaces/user.service.interface';
import { UserService } from '../../src/users/user.service';
import { PrismaService } from '../../src/database/prisma.service';
import { IConfigService } from '../../src/config/config.service.interface';
import { ConfigService } from '../../src/config/config.service';
import { IUsersRepository } from '../../src/users/interfaces/users.repository.interface';
import { UsersRepository } from '../../src/users/users.repository';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<IUserService>(TYPES.IUserService).to(UserService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

const handler: Handler = async (event, context) => {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	await app.init();

	return {
		statusCode: 200,
		body: JSON.stringify({ message: 'Hello from Netlify!', data: 'Your app is running!' }),
	};
};

export { handler };
