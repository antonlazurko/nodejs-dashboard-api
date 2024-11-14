import express, { Express } from "express";
import { Server } from "http";

import { UserController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { ILogger } from "./logger/logger.interface";

export class App {
    app: Express
    server: Server
    port: number
    logger: ILogger
    usersController: UserController
    exceptionFilter: ExceptionFilter
    constructor(logger: ILogger, usersController: UserController, exceptionFilter: ExceptionFilter) {
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