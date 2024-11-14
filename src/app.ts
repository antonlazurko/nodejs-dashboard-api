import express, { Express } from "express";
import { Server } from "http";
import 'reflect-metadata'

import { UserController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { ILogger } from "./logger/logger.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "./types";

@injectable()
export class App {
    app: Express
    server: Server
    port: number
    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private usersController: UserController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter) {
        this.app = express()
        this.port = 8000
    }

    useRoutes(){
        this.app.use('/users', this.usersController.router)
    }

    useExceptionFilters(){
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init (){
        this.useRoutes()
        this.useExceptionFilters()
        this.server = this.app.listen(this.port)
        this.logger.log(`Server started on port ${this.port}`)
    }
}