import express, { Express } from "express";
import { Server } from "http";

import { UserController } from "./users/users.controller";
import { LoggerService } from "./logger/logger.service";
import { ExceptionFilter } from "./errors/exception.filter";

export class App {
    app: Express
    server: Server
    port: number
    logger: LoggerService
    usersController: UserController
    exceptionFilter: ExceptionFilter
    constructor(logger: LoggerService, usersController: UserController, exceptionFilter: ExceptionFilter) {
        this.app = express()
        this.port = 8000
        this.logger = logger
        this.usersController = usersController
        this.exceptionFilter = exceptionFilter
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