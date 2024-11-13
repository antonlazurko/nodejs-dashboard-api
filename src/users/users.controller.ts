import { Request, Response, NextFunction } from "express";

import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { HttpError } from "../errors/http-error.class";

export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
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
        // this.ok(res, 'login');
        next(new HttpError('login error', 401, 'login'))
    }
    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }
}