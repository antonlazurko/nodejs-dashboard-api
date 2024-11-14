import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import 'reflect-metadata'

import { BaseController } from "../common/base.controller";
import { HttpError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { IUserController } from "./user.controller.interface"

@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.login
            },
            {
                path: '/register',
                method: 'post',
                func: this.register
            }
        ]);
    }
    login(req: Request, res: Response, next: NextFunction) {
        if (req?.body) {
            this.ok(res, 'login');
        } else {
            next(new HttpError('Login Error', 401, 'login'))
        }
    }
    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }
}