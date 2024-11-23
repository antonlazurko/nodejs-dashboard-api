import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';

import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { IUserController } from './users/interfaces/user.controller.interface';
import { IBootstrapReturn } from './types/bootstrap.interface';
import { TYPES } from './types/types';
import { IUserService } from './users/interfaces/user.service.interface';
import { UserService } from './users/user.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/interfaces/users.repository.interface';
import { UsersRepository } from './users/users.repository';
import { ProductRepository } from './products/product.repository';
import { IProductRepository } from './products/interfaces/product.repository.interface';
import { IProductController } from './products/interfaces/product.controller.interface';
import { ProductController } from './products/product.controller';
import { IProductService } from './products/interfaces/product.service.interface';
import { ProductService } from './products/product.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<IProductController>(TYPES.IProductController).to(ProductController);
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<IUserService>(TYPES.IUserService).to(UserService);
	bind<IProductService>(TYPES.IProductService).to(ProductService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository).inSingletonScope();
	bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}

export const boot = bootstrap();
