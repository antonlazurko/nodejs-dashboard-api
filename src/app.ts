import 'reflect-metadata';
import express, { Express, json } from 'express';
import { Server } from 'http';
import { injectable, inject } from 'inversify';

import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types/types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/interfaces/users.repository.interface';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { ProductController } from './products/product.controller';
import { IProductRepository } from './products/interfaces/product.repository.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserController) private usersController: UserController,
		@inject(TYPES.IProductController) private productController: ProductController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
		@inject(TYPES.IProductRepository) private productRepository: IProductRepository,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router);
		this.app.use('/products', this.productController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}
	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`[App] Server started on port ${this.port}`);
	}
	public close(): void {
		this.server.close();
		this.logger.log('[App] Server stopped');
	}
}
