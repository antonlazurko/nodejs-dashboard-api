import express, { Express } from "express";
import { Server } from "http";

import { usersRouter } from "./users/users.js";

export class App {
    app: Express
    server: Server
    port: number
    constructor() {
        this.app = express()
        this.port = 8000
    }

    useRoutes(){
        this.app.use('/users', usersRouter)
    }

    public async init (){
        this.useRoutes()
        this.server = this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        })
    }
}