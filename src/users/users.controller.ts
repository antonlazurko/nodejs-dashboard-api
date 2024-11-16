import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import 'reflect-metadata';

import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserController } from './interfaces/user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './interfaces/user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}
	async login(
		{ body }: Request<object, object, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const isUserValid = await this.userService.validateUser(body);
		if (!isUserValid) {
			return next(
				new HttpError('User not found. Please check your login credentials', 401, 'login'),
			);
		}
		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));

		this.loggerService.log(`[UserController] User found with email: ${body.email}`);
		this.ok(res, { jwt }, 200);
	}
	async register(
		{ body }: Request<object, object, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HttpError('User already exist', 422, 'register'));
		}
		this.loggerService.log(`[UserController] User ${result.name} was created.`);
		this.ok(res, { name: result.name, id: result.id }, 201);
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{ email, iat: Math.floor(Date.now() / 1000) },
				secret,
				{ algorithm: 'HS256' },
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
