import express, { Express } from "express";
import { Server } from "http";

import { UserController } from "./users/users.controller";
import { LoggerService } from "./logger/logger.service";

export class App {
    app: Express
    server: Server
    port: number
    logger: LoggerService
    usersController: UserController
    constructor(logger: LoggerService, usersController: UserController) {
        this.app = express()
        this.port = 8000
        this.logger = logger
        this.usersController = usersController
    }

    useRoutes(){
        this.app.use('/users', this.usersController.router)
    }

    public async init (){
        this.useRoutes()
        this.server = this.app.listen(this.port)
        this.logger.log(`Server started on port ${this.port}`)
    }
}